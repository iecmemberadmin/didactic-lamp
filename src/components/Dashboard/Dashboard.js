import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Row, Col, Button} from 'reactstrap';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    }
  }

  componentWillMount() {
    console.log(localStorage.getItem('student_number'));
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`)
    .then(response => {
      this.setState({details: response.data});
      console.log(response.data);
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
          <p>This site is still a work in progress, but please stay tuned for the upcoming features we have in store for you! <br/><i>- Member Administration Team</i></p>
        </Container>
      </div>
    );  
  }
};

export default Dashboard;