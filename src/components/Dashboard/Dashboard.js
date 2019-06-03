import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Row, Col, Button, Toast, ToastHeader, ToastBody} from 'reactstrap';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      isReaffActive: false,
      isReaffed: false
    }
  }

  componentWillMount() {
    console.log(localStorage.getItem('student_number'));
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`)
    .then(response => {
      this.setState({details: response.data});
      console.log(response.data);
    });
    axios.get('https://clubberdb-api.herokuapp.com/proc/reaff/')
    .then(response => {
      if(response.status === 200) {
        if(response.data.active === true) {
          this.setState({isReaffActive: true});
        }
      }
    }); 
    axios.get(`https://clubberdb-api.herokuapp.com/reaff/${localStorage.getItem('student_number')}/`)
    .then(response => {
      //console.log(response.status);
      if(response.status === 200) {
        this.setState({isReaffed: true, reaffDetails: response.data});
      }
    });
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          {/* <Row>
            <Col sm='8'><h3>Welcome, Clubber!</h3></Col>
            {this.state.details !== {} && <Col>Logged in as {this.state.details.nick_name} {this.state.details.last_name} <Button size='sm' href='/'>Log out</Button></Col>}
          </Row> */}
          <h3>Dashboard</h3>
          <Row>
            <Col>
              <Toast>
                <ToastHeader icon="warning">
                  Announcements
                </ToastHeader>
                <ToastBody>
                <Toast>
                  <ToastHeader icon="danger">
                    Mem Admin Team
                  </ToastHeader>
                  <ToastBody>
                  This site is still a work in progress, but please stay tuned for the upcoming features we have in store for you!
                  </ToastBody>
                </Toast>
                <Toast>
                  <ToastHeader icon="danger">
                    Mem Admin Team
                  </ToastHeader>
                  <ToastBody>
                    New features as of:<br/>
                    <ul>
                      <li>April 12, 2019</li>
                      <ul>
                        <li>Clubber Primer</li>
                        <li>Redefined Dashboard</li>
                      </ul>
                      <li>June 3, 2019</li>
                      <ul>
                        <li>Integrated application form for role applications</li>
                      </ul>
                    </ul>
                  </ToastBody>
                </Toast>
                </ToastBody>
              </Toast>
            </Col>
            <Col>
              {/* <Toast>
                <ToastHeader icon="info">
                  Member Administration Team
                </ToastHeader>
                <ToastBody>
                This site is still a work in progress, but please stay tuned for the upcoming features we have in store for you!
                </ToastBody>
              </Toast> */}
            </Col>
            <Col>
            {this.state.isReaffActive &&
              <Toast>
                <ToastHeader icon="danger">
                  Reaff
                </ToastHeader>
                <ToastBody>
                Reaff for this semester is now open! <a href='/profile'>Click here to reaff.</a>
                </ToastBody>
              </Toast>}
              <Toast>
                <ToastHeader icon="success">
                  Welcome, Clubber!
                </ToastHeader>
                <ToastBody>
                {this.state.details !== {} && <div>Logged in as {this.state.details.nick_name} {this.state.details.last_name} <Button size='sm' href='/'>Log out</Button></div>}
                </ToastBody>
              </Toast>
            </Col>
          </Row>
        </Container>
      </div>
    );  
  }
};

export default Dashboard;