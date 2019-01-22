import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Row, Col, Button, Card, CardBody, CardTitle, CardText} from 'reactstrap';
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
          <Row>
            <Col sm='8'><h3>Welcome, Clubber!</h3></Col>
            {this.state.details !== {} && <Col>Logged in as {this.state.details.nick_name} {this.state.details.last_name} <Button size='sm' href='/'>Log out</Button></Col>}
          </Row>
          <br/>
          <br/>
          {this.state.isReaffActive &&
          <Card>
            <CardBody>
              <CardTitle>Reaff for this semester is now open!</CardTitle>
              <CardText><a href='/profile'>Click here to reaff.</a></CardText>
            </CardBody>
          </Card>}
          <br/>
          <Card>
            <CardBody>
              <CardText>
                This site is still a work in progress, but please stay tuned for the upcoming features we have in store for you! <br/><i>- Member Administration Team</i>
              </CardText>
            </CardBody>
          </Card>
        </Container>
      </div>
    );  
  }
};

export default Dashboard;