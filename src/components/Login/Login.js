import React, {Component} from 'react';
// eslint-disable-next-line
import { Card, CardText, CardBody, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import iec from '../../assets/Images/ieclub.png';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_number: '',
      password: '',
      visible: false,
      isLoading: false
    };
  }

  onChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  }

  onDismiss = () => {
    this.setState({visible: false});
  }

  logIn = () => {
    console.log({
      student_number: this.state.student_number,
      password: this.state.password
    });
    this.setState({isLoading: true})
    axios.get(`http://clubberdb-api.herokuapp.com/clubbers/${this.state.student_number}/?password=${this.test.password}`)
    .then(response => {
      if(response.status === 200) {
        this.setState({isLoading: false});
        this.props.history.push('/dashboard');
        console.log('Login successful');
      }
    })
    .catch(error => {
      if(error.response.status === 404) {
        this.setState({visible: true, isLoading: false});
      }
    });
  }

  render() {
    return( 
      <div className='container'>
        <div className='centered'><h4 className='text-danger'><img alt='IECLUBLOGO' src={iec} height='5%' width='5%' /> Inside The Club</h4></div>
        <div>
          <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
            Invalid username and/or password.
          </Alert>
          <Alert color="light" isOpen={this.state.isLoading}>
            Verifying your login credentials, please wait...
          </Alert>
          <Card id='login'>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="studNum">Student Number</Label>
                  <Input type="text" name="studNum" id="student_number" onChange={this.onChange} placeholder="2015-12345" />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" onChange={this.onChange}/>
                </FormGroup>
                <div className='centered'><Button outline color='danger' onClick={this.logIn}>Login</Button></div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
};

export default Login;