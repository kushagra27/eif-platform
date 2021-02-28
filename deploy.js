// The require packages
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const md5File = require('md5-file');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
// const SolidityFunction = require('web3/lib/web3/function');
const cont = require('./app/src/components/contracts/createToken.sol')
// Retrieve the command line arguments
let argv = require('minimist')(process.argv.slice(2));

let accounts = [
    {
        // Ganache Default Accounts, do not use it for your production
        // Develop 1
        address: '0xbee19c31a6d888de76B5eb3A87054e87a9C51FfF',
        key: 'bf7c91d0ce0d9ecf5f42bf30207dc69220dcf237f2a4611ac81a8f7a29231a9a'
    }
];

// Ganache or Private Ethereum Blockchain
let selectedHost = 'https://ropsten.infura.io/v3/faaa4fcc1a1b4986b36d12ae4fded58a';

let selectedAccountIndex = 0; // Using the first account in the list

web3 = new Web3(new Web3.providers.HttpProvider(selectedHost));

let gasPrice = web3.eth.gasPrice;
let gasPriceHex = web3.utils.toHex(gasPrice);
let gasLimitHex = web3.utils.toHex(6000000);
let block = web3.eth.getBlock("latest");
let nonce =  web3.eth.getTransactionCount(accounts[selectedAccountIndex].address, "pending");
let nonceHex = web3.utils.toHex(nonce);

function deployContract(contract) {

    // It will read the ABI & byte code contents from the JSON file in ./build/contracts/ folder
    let jsonOutputName = path.parse(contract).name + '.json';
    let jsonFile = './build/contracts/' + jsonOutputName;

    // After the smart deployment, it will generate another simple json file for web frontend.
    let webJsonFile = './www/assets/contracts/' + jsonOutputName;
    let result = false;

    try {
        result = fs.statSync(jsonFile);
    } catch (error) {
        console.log(error.message);
        return false;
    }

    // Read the JSON file contents
    let contractJsonContent = fs.readFileSync(jsonFile, 'utf8');    
    let jsonOutput = JSON.parse(contractJsonContent);

    // Retrieve the ABI 
    let abi = jsonOutput['contracts'][contract][path.parse(contract).name]['abi'];

    // Retrieve the byte code
    let bytecode = jsonOutput['contracts'][contract][path.parse(contract).name]['evm']['bytecode']['object'];
    
    let tokenContract = web3.eth.contract(abi);
    let contractData = null;

    // Prepare the smart contract deployment payload
    // If the smart contract constructor has mandatory parameters, you supply the input parameters like below 
    //
    // contractData = tokenContract.new.getData( param1, param2, ..., {
    //    data: '0x' + bytecode
    // });    

    contractData = tokenContract.new.getData({
        data: '0x' + bytecode
    });    

    // Prepare the raw transaction information
    let rawTx = {
        nonce: nonceHex,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        data: contractData,
        from: accounts[selectedAccountIndex].address
    };

    // Get the account private key, need to use it to sign the transaction later.
    let privateKey = new Buffer(accounts[selectedAccountIndex].key, 'hex')

    let tx = new Tx(rawTx);

    // Sign the transaction 
    tx.sign(privateKey);
    let serializedTx = tx.serialize();

    let receipt = null;

    // Submit the smart contract deployment transaction
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
        if (err) { 
            console.log(err); return; 
        }
    
        // Log the tx, you can explore status manually with eth.getTransaction()
        console.log('Contract creation tx: ' + hash);
    
        // Wait for the transaction to be mined
        while (receipt == null) {

            receipt = web3.eth.getTransactionReceipt(hash);

            // Simulate the sleep function
            Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
        }

        console.log('Contract address: ' + receipt.contractAddress);
        console.log('Contract File: ' + contract);

        // Update JSON
        jsonOutput['contracts'][contract]['contractAddress'] = receipt.contractAddress;

        // Web frontend just need to have abi & contract address information
        let webJsonOutput = {
            'abi': abi,
            'contractAddress': receipt.contractAddress
        };

        let formattedJson = JSON.stringify(jsonOutput, null, 4);
        let formattedWebJson = JSON.stringify(webJsonOutput);

        //console.log(formattedJson);
        fs.writeFileSync(jsonFile, formattedJson);
        fs.writeFileSync(webJsonFile, formattedWebJson);

        console.log('==============================');
    
    });
    
    return true;
}

if (typeof argv.deploy !== 'undefined') {
    // Build contract

    let contract = argv.deploy;

    let result = deployContract(contract);
    return;
}

deployContract(cont);
console.log('End here.');