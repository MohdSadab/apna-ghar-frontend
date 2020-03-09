import React from 'react';
import Login from './components/Auth/Login';
import {Route,Switch} from 'react-router-dom';
import './App.scss';
import SignUp from './components/Auth/SignUp';

function App() {
  return (
    <div className="App">
       <div className="container">
          <Switch>
          <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
          </Switch>
         
       </div>
    </div>
  );
}

export default App;
