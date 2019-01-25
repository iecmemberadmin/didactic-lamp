import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
import {Switch, Route, withRouter} from 'react-router-dom';
// eslint-disable-next-line
import NavMenu from './components/NavMenu/NavMenu';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ClubberProfile from './components/ClubberProfile/ClubberProfile';
import PrivateRoute from './PrivateRoute';
import {connect} from 'react-redux';
import Directory from './components/Directory/Directory';
import AdminDashboard from './components/ADMIN/AdminDashboard/AdminDashboard';
import AddClubber from './components/ADMIN/AddClubber/AddClubber';
import AddAnnouncement from './components/ADMIN/AddAnnouncement/AddAnnouncement';
import ViewAnnouncements from './components/ADMIN/ViewAnnouncements/ViewAnnouncements';
import ViewRegistered from './components/ADMIN/ViewRegistered/ViewRegistered';
import ViewProcesses from './components/ADMIN/ViewProcesses/ViewProcesses';
import ViewReaffed from './components/ADMIN/ViewReaffed/ViewReaffed';
import Signup from './components/Signup/Signup';
import ConfirmPending from './components/ADMIN/ConfirmPending/ConfirmPending';
import EnggWeek from './components/EnggWeek/EnggWeek';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkAuth = () => {
    let authenticated = localStorage.getItem('authenticated');
    if(authenticated === 'true') {
      return true;
    }else {
      return false;
    }
  }

  render() {
    return (
      <div>
        {/* <NavMenu /> */}
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          {/* <Route exact path='/dashboard' component={Dashboard} /> */}
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/dashboard' component={Dashboard} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/enggweek' component={EnggWeek} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/profile' component={ClubberProfile} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/directory' component={Directory} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin' component={AdminDashboard} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/add/clubber' component={AddClubber} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/add/announcement' component={AddAnnouncement} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/announcement' component={ViewAnnouncements} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/registered' component={ViewRegistered} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/reaffed' component={ViewReaffed} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/processes' component={ViewProcesses} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/pending' component={ConfirmPending} />
          {/* <Route exact path='/profile' component={ClubberProfile} /> */}
        </Switch>
      </div>  
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(App));
