import React from "react";
// import "./App.css";
import TorusSdk from "@toruslabs/torus-direct-web-sdk";
import { withRouter } from "react-router-dom"
import { Container, Row, Col, 
  Form, Button, Spinner ,
  Modal
} from 'react-bootstrap'
import axios from 'axios'
import db from './Firestore';


const GOOGLE = "google";
const FACEBOOK = "facebook";
const REDDIT = "reddit";
const DISCORD = "discord";
const TWITCH = "twitch";
const GITHUB = "github";
const APPLE = "apple";
const LINKEDIN = "linkedin";
const TWITTER = "twitter";
const WEIBO = "weibo";
const LINE = "line";
const EMAIL_PASSWORD = "email_password";
const PASSWORDLESS = "passwordless";
const HOSTED_EMAIL_PASSWORDLESS = "hosted_email_passwordless";
const HOSTED_SMS_PASSWORDLESS = "hosted_sms_passwordless";
const WEBAUTHN = "webauthn";



const details = {
  "publicAddress":"0xbee19c31a6d888de76B5eb3A87054e87a9C51FfF",
  "privateKey":"bf7c91d0ce0d9ecf5f42bf30207dc69220dcf237f2a4611ac81a8f7a29231a9a",
  "metadataNonce":"0",
  "userInfo":{
    "email":"agarwalkush27@gmail.com",
    "name":"Kushagra Agarwal",
    "profileImage":"https://lh4.googleusercontent.com/-5SHJTvzYhO8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmMPllUEE-TAKVp3Cj9mVohUN1Pmw/s96-c/photo.jpg",
    "verifier":"platform-google-testnet",
    "verifierId":"agarwalkush27@gmail.com",
    "typeOfLogin":"google",
    "accessToken":"ya29.A0AfH6SMC4bvLrMRI7etIWTIWRnpHEDB8mcnySK5xlpfxX19_C4bBecfOVwJHTsY7xR7yyiK-IjqIlKHngqp5u9AykbZpaWiUfpIwNZlgl280QRJvxrL6R1m10pbTmYOOlYXErvKIdk61ZEuSzodNp0B-yur95",
    "idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYjQwZTJmOTM1M2M1OGFkZDY0OGI2MzYzNGU1YmJmNjNlNGY1MDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDc5Mzc3MDk0NzQtcHNyNmc4amwzZTNnMm9wZ3FicjZxYmk3cTYxaWp2YjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDc5Mzc3MDk0NzQtcHNyNmc4amwzZTNnMm9wZ3FicjZxYmk3cTYxaWp2YjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE0NzU0ODk0OTgzODU0MzQyMDUiLCJlbWFpbCI6ImFnYXJ3YWxrdXNoMjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJQTDNBSENERFJxcVJEMUVTV2U1UmNnIiwibm9uY2UiOiJLcGQ5RUM3QWFkcnJUdlpDeEtRaUVNZGMxRU5jYVEiLCJuYW1lIjoiS3VzaGFncmEgQWdhcndhbCIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLTVTSEpUdnpZaE84L0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21NUGxsVUVFLVRBS1ZwM0NqOW1Wb2hVTjFQbXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6Ikt1c2hhZ3JhIiwiZmFtaWx5X25hbWUiOiJBZ2Fyd2FsIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTM5MDcxODcsImV4cCI6MTYxMzkxMDc4NywianRpIjoiYWVlMGI2ZmM3Zjc1NTBmYmE3ZWJiOTk0MzgyYjZiY2M5Nzc5ZDk1OSJ9.A00LLGGJqDRe60Cj7G1gw17wDy4HJANt7Jh5wQ2zpyey3w0r35659uT9Nkvhny2C2Z0Qfd27T3YHODAFMg-gNkfv_0PSY5eRm6fYNFQODPRamWlgYBs2A7HOnUKT76EcUN8w51rkU6iBFUtIjBfsuIqzx9PG8-Wz84QRpX-dHgW1MxtcWl-oDp-19iG7zPq0PrcsDgrsJCbIP6T_jJmxF6cfH4JFVG79D5pPNTGw638gJ8374YuzJgviBnB48L4MaJqgfVPIvfLaHFKpr5gQicYo5SkGAaH74GLvLmCTL25XHpr6SUvvFmvcLaHsMKaxWAPW6IVP9OOmXGkxFobayQ",
    "state":{
      "instanceId":"Kpd9EC7AadrrTvZCxKQiEMdc1ENcaQ",
      "verifier":"platform-google-testnet",
      "typeOfLogin":"google",
      "redirectToOpener":false
    },
    "token_type":"Bearer",
    "expires_in":"3599",
    "scope":"email%20profile%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20openid",
    "authuser":"0",
    "prompt":"consent"
  }
}

const AUTH_DOMAIN = "https://torus-test.auth0.com";

const verifierMap = {
  // Working with google oauth
  [GOOGLE]: {
    name: "Google",
    typeOfLogin: "google",
    verifier: "platform-google-testnet",
    clientId: "747937709474-psr6g8jl3e3g2opgqbr6qbi7q61ijvb6.apps.googleusercontent.com",
  }

  // firebase oauth
  // [GOOGLE]: {
  //   name: "Google",
  //   typeOfLogin: "google",
  //   verifier: "platform-testnet-google",
  //   clientId: "806960423055-20t498trt1973ehja93s9mv4i7nmjuqj.apps.googleusercontent.com",
  // }
};

class Torus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedVerifier: GOOGLE, 
      torusdirectsdk: null, 
      loginHint: "", 
      consoleText: "" ,
      email:"",
      loading:false,
      redirect: false,
      login:false,
      registered: false,
      modalShow: false,
      tPrecision: 2,
      tNumber: 1000
    };
  }

  componentDidMount = async () => {

    try {
      this.setState({loading:true})

      db.collection('tags')
      .get()
      .then((qs)=>{
        var tags = []
        qs.forEach(doc=>{
          tags.push(doc.id)
        })
        this.setState({tags})
        console.log(tags)
      })

      const torusdirectsdk = new TorusSdk({
        baseUrl: `${window.location.origin}`,
        enableLogging: true,
        network: "testnet", // details for test net
      });

      await torusdirectsdk.init({ skipSw: false });

      this.setState({ torusdirectsdk: torusdirectsdk });

      const loginDetails = await torusdirectsdk.getRedirectResult();
      if (loginDetails) {
        // console.log(JSON.stringify(loginDetails.result))
        this.setState({ 
          loginDetails: loginDetails.result,
          login: true,
          name: loginDetails.result.userInfo.name
          // loading: false
        })

        var reg = false

        db.collection('users')
        .where("email", "==", loginDetails.result.userInfo.email)
        .get()
        .then(async qs=>{
          await qs.forEach(doc=>{
            console.log(doc.id, "=>", doc.data())
            this.setState({registered: true})
            reg = true
          })
          if(reg === false){
            // console.log("onpe ")
            this.setState({registered: false, loading: false})
          } else {
            this.setState({loading: false})
          }
        })

      }

    } catch (error) {
      this.setState({redirect:false, loading:false})
      console.error(error, "mounted caught");
    }


    
    // this.login()
  };

  login = async () => {
    // e.preventDefault();
    const { selectedVerifier, torusdirectsdk } = this.state;


    // to be uncommented
    try {
      const jwtParams = this._loginToConnectionMap()[selectedVerifier] || {};
      const { typeOfLogin, clientId, verifier } = verifierMap[selectedVerifier];
      const loginDetails = await torusdirectsdk.triggerLogin({
        typeOfLogin,
        verifier,
        clientId,
        jwtParams,
      });
      this.setState({ consoleText: typeof loginDetails === "object" ? JSON.stringify(loginDetails) : loginDetails });
    } catch (error) {
      console.error(error, "login caught");
    }



  };

  _loginToConnectionMap = () => {
    const { loginHint } = this.state;
    return {
      [EMAIL_PASSWORD]: { domain: AUTH_DOMAIN },
      [PASSWORDLESS]: { domain: AUTH_DOMAIN, login_hint: loginHint },
      [HOSTED_EMAIL_PASSWORDLESS]: { domain: AUTH_DOMAIN, verifierIdField: "name", connection: "", isVerifierIdCaseSensitive: false },
      [HOSTED_SMS_PASSWORDLESS]: { domain: AUTH_DOMAIN, verifierIdField: "name", connection: "" },
      [APPLE]: { domain: AUTH_DOMAIN },
      [GITHUB]: { domain: AUTH_DOMAIN },
      [LINKEDIN]: { domain: AUTH_DOMAIN },
      [TWITTER]: { domain: AUTH_DOMAIN },
      [WEIBO]: { domain: AUTH_DOMAIN },
      [LINE]: { domain: AUTH_DOMAIN },
    };
  };

  handleChange = (e) =>{
    var {name, value} = e.target
    if(name === 'tSymbol'){
      value = value.toUpperCase()
    }
    this.setState({
        [name]: value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    if(this.state.tag === undefined || this.state.name.length === 0 || this.state.tag.length === 0){
      alert("Fields cannot be blank")
      return
    }
    var flg = true
    this.state.tags.map(item=>{
      if (item === this.state.tag){
        flg = false
        console.log("found")
      } else {

      }
    })
    
    if(!flg){
      alert("This tag is Already Taken")
      // console.log("showed")
      return
    }

    this.setState({loading: true})

    const obj = {
      name: this.state.name,
      email: this.state.loginDetails.userInfo.email,
      privateKey: this.state.loginDetails.privateKey,
      publicAddress: this.state.loginDetails.publicAddress,
      tag: this.state.tag
    }
    
    const tagObj = {
      tag: this.state.tag,
      email: this.state.loginDetails.userInfo.email
    }

    var batch = db.batch();

    // Set the value of 'NYC'
    var userRef = db.collection("users").doc(this.state.loginDetails.userInfo.email)
    batch.set(userRef, obj);

    // Update the population of 'SF'
    var tagRef = db.collection("tags").doc(this.state.tag)
    batch.set(tagRef, tagObj);

    // Commit the batch
    batch.commit().then(() => {
        alert("User Created")
        this.setState({registered: true, loading: false})
    });


    console.log("clicked", obj)
  }

  handleCreate = () =>{
    console.log("Handle Create")
    const data = {
      tokenPrecision: this.state.tPrecision,
      owner: this.state.loginDetails.publicAddress,
      tokenName: this.state.tName,
      tokenNumber: this.state.tNumber,
      tokenSymbol: this.state.tSymbol,
      totalSupply: this.state.tNumber * (Math.pow(10,this.state.tPrecision))
    }
    console.log(data)
    axios.post('http://localhost:5000/deploy', data).then(res=>{
      console.log(res)
    })
  }

  render() {
    const { selectedVerifier, loginHint, consoleText } = this.state;
    let emailField = "";
    // console.log(email)
    if (selectedVerifier === PASSWORDLESS) {
      emailField = (
        <div style={{ marginTop: "20px" }}>
          <input type="email" value={loginHint} onChange={(e) => this.setState({ loginHint: e.target.value })} placeholder="Enter your email" />
        </div>
      );
    }

    return (
      <Container fluid="md">
        {
          this.state.login && this.state.registered?
          <>
            <Row style={{justifyContent:"center", alignItems:"center"}}>
              <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Registered</Form.Label>
                {/* <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/> */}
                <Form.Control type="text" value={this.state.loginDetails.userInfo.email} placeholder={this.state.loginDetails.userInfo.email} readOnly/>
                <Form.Text className="text-muted">
                  Registered
                </Form.Text>
              </Form.Group>
              </Form>
            </Row>
            <Row style={{justifyContent:"center", alignItems:"center"}}>
            
            <div>
              <Button variant="primary" onClick={()=>{this.setState({modalShow: true})}}>
                Create Your own Token
              </Button>
              <Modal show={this.state.modalShow} onHide={()=>{this.setState({modalShow: false})}}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Your Token</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{justifyContent:"center", alignItems:"center"}}>

                  <Form.Group controlId="formBasicTName">
                    <Form.Label>Token Name</Form.Label>
                    <Form.Control type="text" name="tName" value={this.state.tName} placeholder= "Enter Name" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the name of your Token.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTSymbol">
                    <Form.Label>Token Symbol</Form.Label>
                    <Form.Control type="text" name="tSymbol" value={this.state.tSymbol} placeholder= "Enter Symbol" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the symbol with which your token will be traded.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTPrecision">
                    <Form.Label>Decimal Precision</Form.Label>
                    <Form.Control type="text" name="tPrecision" value={this.state.tPrecision} placeholder= "Enter Precision" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the precision to which your token can be divided. Eg - Bitcoin can be divided to 8 decimal places.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTNumber">
                    <Form.Label>Number of Tokens</Form.Label>
                    <Form.Control type="text" name="tNumber" value={this.state.tNumber} placeholder= "Enter Token Number" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the total Number of tokens that will be circulating in the market. Eg - Bitcoin has a total of 21 Million tokens in circulation
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTSupply" >
                    <Form.Label>Total Supply</Form.Label>
                    <Form.Control type="text" name="tSupply" value={this.state.tNumber * (Math.pow(10,this.state.tPrecision))} placeholder= "Enter Token Number" onChange={this.handleChange} disabled/>
                    <Form.Text className="text-muted">
                      This is the total supply of tokens that will be circulating in the market.
                    </Form.Text>
                  </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>{this.setState({modalShow: false})}}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleCreate}>
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            </Row>
          </>
          : this.state.login && !this.state.registered?

            <Row style={{justifyContent:"center", alignItems:"center"}}>
              <Form>
                <h1>Register New User</h1>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={this.state.loginDetails.userInfo.name} placeholder={this.state.loginDetails.userInfo.name} onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                    Your Display Name.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" value={this.state.loginDetails.userInfo.email} placeholder={this.state.loginDetails.userInfo.email} readOnly/>
                  {/* <Form.Text className="text-muted">
                    Yet to register
                  </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="formBasicKey">
                  <Form.Label>Private Key</Form.Label>
                  <Form.Control type="text" value={this.state.loginDetails.privateKey} placeholder={this.state.loginDetails.privateKey} readOnly/>
                  <Form.Text className="text-muted">
                    This is your private key, Save it and do not share with anyone.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                  <Form.Label>Public Address</Form.Label>
                  <Form.Control type="text" value={this.state.loginDetails.publicAddress} placeholder={this.state.loginDetails.publicAddress} readOnly/>
                  <Form.Text className="text-muted">
                    This is your public account address, Save it to share with others
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicID">
                  <Form.Label>Unique ID</Form.Label>
                  <Form.Control type="text" name="tag" value={this.state.tag} placeholder= "Enter ID" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                    This is the embed ID that will point to your page, you can change it in future based on availability.
                  </Form.Text>


                </Form.Group>
                
                <Button variant="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Row>
          :
            <Row style={{justifyContent:"center", alignItems:"center"}}>
              <div className="App">
                  <div style={{ marginTop: "20px" }}>
                    <Button 
                      onClick={this.login}
                      disabled = {this.state.loading}
                    >
                      {this.state.loading?
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      : <div></div>
                      }

                      Login with Google
                    </Button>
                  </div>
                <div id="app">
                    <div id="console">
                      <p></p>
                    </div>
                </div>
                <div className="console">
                  <p>{consoleText}</p>
                </div>
              </div>
            
            {/* <div>
              <Button variant="primary" onClick={()=>{this.setState({modalShow: true})}}>
                Create Your own Token
              </Button>
              <Modal show={this.state.modalShow} onHide={()=>{this.setState({modalShow: false})}}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Your Token</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{justifyContent:"center", alignItems:"center"}}>

                  <Form.Group controlId="formBasicTName">
                    <Form.Label>Token Name</Form.Label>
                    <Form.Control type="text" name="tName" value={this.state.tName} placeholder= "Enter Name" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the name of your Token.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTSymbol">
                    <Form.Label>Token Symbol</Form.Label>
                    <Form.Control type="text" name="tSymbol" value={this.state.tSymbol} placeholder= "Enter Symbol" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the symbol with which your token will be traded.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTPrecision">
                    <Form.Label>Decimal Precision</Form.Label>
                    <Form.Control type="text" name="tPrecision" value={this.state.tPrecision} placeholder= "Enter Precision" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the precision to which your token can be divided. Eg - Bitcoin can be divided to 8 decimal places.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTNumber">
                    <Form.Label>Number of Tokens</Form.Label>
                    <Form.Control type="text" name="tNumber" value={this.state.tNumber} placeholder= "Enter Token Number" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                      This is the total Number of tokens that will be circulating in the market. Eg - Bitcoin has a total of 21 Million tokens in circulation
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicTSupply" >
                    <Form.Label>Total Supply</Form.Label>
                    <Form.Control type="text" name="tSupply" value={this.state.tNumber * (Math.pow(10,this.state.tPrecision))} placeholder= "Enter Token Number" onChange={this.handleChange} disabled/>
                    <Form.Text className="text-muted">
                      This is the total supply of tokens that will be circulating in the market.
                    </Form.Text>
                  </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>{this.setState({modalShow: false})}}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.handleCreate}>
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>*/}
            </Row>
        }
  </Container>
    );
  }
}

export default withRouter(Torus);