const DirectWebSdk = require("@toruslabs/torus-direct-web-sdk").DirectWebSdk;
const express = require('express')
const request = require('request')
const fs = require('fs')
const bodyParser = require("body-parser");
var path = require('path')
const { exec, spawn } = require("child_process");
const web3 = require('web3');
const app = express()


const host = 'http://localhost'

// app.use('/', express.static('./build'));
// app.use('/redirect', express.static('./redirect.html'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors())

// app.get('/get_token', function(request, response) {
//     var token = request.query.access_token
//     var obj = {access_token: token}
//     var status = myCache.set( "myKey", obj, 86400);
//     console.log(status)
//     console.log(myCache.get('myKey'))
//     const content = `const access_token ="${token}";export default access_token;`
//     console.log(token)
//     fs.writeFile('./access_token.js', content, err => {
//         if (err) {
//             console.error(err)
//             return
//         }
//     })
//     response.writeHead(301,{Location: 'http://'+request.headers.host+'/login'});
//     response.end();
// })

app.post('/deploy',function(request,response){
    var owner = request.body.owner;
    var tokenName = request.body.tokenName;
    var tokenSymbol = request.body.tokenSymbol;
    var tokenNumber = request.body.tokenNumber;
    var tokenPrecision = request.body.tokenPrecision;
    var totalSupply = request.body.totalSupply;
    console.log(owner,tokenName,tokenSymbol,tokenNumber,totalSupply, tokenPrecision)
    
    function writeContract(){
        fs.readFile('./deploy/contractTemplates/erc20.sol', 'utf-8', function(err, data){
            if (err) throw err;
            var data = data.replace(/ENTER SYMBOL HERE/g, tokenSymbol);
            var data = data.replace(/ENTER TOKEN NAME HERE/g, tokenName);
            var data = data.replace(/DECIMAL NUMBER/g, tokenPrecision);
            var data = data.replace(/TOTAL SUPPLY/g, totalSupply);
            var data = data.replace(/OWNER ACCOUNT ADDRESS/g, owner);
            // console.log(data)
    
          fs.writeFile('./deploy/contracts/'+tokenSymbol+'.sol', data, 'utf-8', function (err) {
            if (err) throw err;
            console.log('Contract written');
          });
    
        });
    }

    function writeDeployer() {
        fs.readFile('./deploy/contractTemplates/4_deploy_temp.js', 'utf-8', function(err, data){
          if (err) throw err;

          var data = data.replace(/ENTER SYMBOL HERE/g, tokenSymbol);
      
          fs.writeFile('./deploy/migrations/4_deploy_temp.js', data, 'utf-8', function (err) {
            if (err) throw err;

            console.log('deployer written');
          });
        });
    }

    function writeShellScript(){
        // exec("truffle deploy --network ropsten",{cwd: '/home/ubuntu/distro'} , (error, stdout, stderr) => {
        //     exec("truffle deploy --network ropsten",{cwd: __dirname + "/deploy"} , (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`error: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         console.log(`stderr: ${stderr}`);
        //         return;
        //     }
        //     console.log(`stdout: ${stdout}`);
        // });
        fs.readFile('./deploy/contracts/TEET.sol', 'utf-8', function(err, data){
            if (err) throw err;
            var contractCompiled = web3.eth.compile.solidity(data);
            var code = contractCompiled.code;
            var abi = contractCompiled.info.abiDefinition;
            fs.writeFile('./abi', abi, 'utf-8', function (err) {
                if (err) throw err;
    
                console.log('abi written');
            });   
            fs.writeFile('./codeFile', code, 'utf-8', function (err) {
                if (err) throw err;
    
                console.log('code written');
            });   
        })
    }

    // writeContract()
    // writeDeployer() 
    writeShellScript() 

    response.writeHead(200)
    response.end()
})

// app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

var port = 5000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)