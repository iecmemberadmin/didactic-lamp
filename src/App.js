import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
import {Switch, Route} from 'react-router-dom';
// eslint-disable-next-line
import NavMenu from './components/NavMenu/NavMenu';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ClubberProfile from './components/ClubberProfile/ClubberProfile';

class App extends Component {
  render() {
    return (
      <div>
        {/* <NavMenu /> */}
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/profile' component={ClubberProfile} />
        </Switch>
      </div>  
    );
  }
}

export default App;
