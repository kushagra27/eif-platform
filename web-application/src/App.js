import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Torus from './components/Torus'
// import Redirect from './components/Redirect'


function App() {
  return (
    <>
        <div style={{marginTop:"3rem"}}>
          <Router>
            <Switch>
              {/* <Route exact path="/redirect" component={Redirect} /> */}
              <Route exact path="/redirect" component={Torus} />
              <Route exact path="/" component={Torus} />
            </Switch>
          </Router>
        </div>
    </>
  );
}

export default App;
