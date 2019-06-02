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
import ViewRegistered from './components/ADMIN/ViewRegistered/ViewRegistered';
import ViewProcesses from './components/ADMIN/ViewProcesses/ViewProcesses';
import ViewReaffed from './components/ADMIN/ViewReaffed/ViewReaffed';
import Signup from './components/Signup/Signup';
import ConfirmPending from './components/ADMIN/ConfirmPending/ConfirmPending';
import Attendance from './components/ADMIN/Attendance/Attendance';
import Events from './components/ADMIN/Events/Events';
import CurrentSubjects from './components/ADMIN/CurrentSubjects/CurrentSubjects';
import AddAdmin from './components/ADMIN/AddAdmin/AddAdmin';
import ResourceAccess from './components/ADMIN/ResourceAccess/ResourceAccess';
import ViewAdmin from './components/ADMIN/ViewAdmin/ViewAdmin';
import ViewBirthdays from './components/ADMIN/ViewBirthdays/ViewBirthdays';
import ClubberPrimer from './components/ClubberPrimer/ClubberPrimer';
import Rainbox from './components/Rainbox/Rainbox';
import ViewPrimer from './components/ADMIN/ViewPrimer/ViewPrimer';
import AddPosition from './components/ADMIN/ViewPrimer/AddPosition';
import ViewApplications from './components/ADMIN/ViewPrimer/ViewApplications';
import MemEval from './components/MemEval/MemEval';
import EditPosition from './components/ADMIN/ViewPrimer/EditPosition';
import ViewQuestions from './components/ADMIN/ViewPrimer/ViewQuestions';

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
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/profile' component={ClubberProfile} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/directory' component={Directory} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/rainbox' component={Rainbox} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/primer' component={ClubberPrimer} />
          <PrivateRoute authenticated={localStorage.getItem('authenticated') === 'true'} exact path='/eval' component={MemEval} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin' component={AdminDashboard} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/add/clubber' component={AddClubber} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/registered' component={ViewRegistered} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/reaffed' component={ViewReaffed} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/processes' component={ViewProcesses} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/pending' component={ConfirmPending} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/events' component={Events} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/events/attendance' component={Attendance} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/acad/subjects' component={CurrentSubjects} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/add/credentials' component={AddAdmin} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/credentials' component={ViewAdmin} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/resourceaccess' component={ResourceAccess} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/view/birthdays' component={ViewBirthdays} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/primer/view' component={ViewPrimer} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/primer/add' component={AddPosition} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/primer/applications' component={ViewApplications} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/primer/edit' component={EditPosition} />
          <PrivateRoute authenticated={localStorage.getItem('authenticatedAdmin') === 'true'} exact path='/admin/primer/questions' component={ViewQuestions} />
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
