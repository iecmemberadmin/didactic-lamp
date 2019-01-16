import React, {Component} from 'react';
// eslint-disable-next-line
import { Card, CardText, CardBody, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import iec from '../../assets/Images/ieclub.png';
import axios from 'axios';
import {connect} from 'react-redux';
import {authenticate} from '../../actions/authActions';

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
    this.setState({isLoading: true, visible: false});
    if(this.state.student_number === 'clubberadmin' && this.state.password === 'ieclubwinternals') {
      this.setState({isLoading: false});
      localStorage.setItem('authenticatedAdmin', 'true');
      this.props.history.push('/admin');
    }else {
      axios.get(`https://clubberdb-api.herokuapp.com/login/${this.state.student_number}/?password=${this.state.password}`)
      .then(response => {
        if(response.status === 200) {
          this.setState({isLoading: false});
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('authenticatedAdmin', 'false');
          localStorage.setItem('student_number', this.state.student_number);
          this.props.history.push('/dashboard');
          console.log('Login successful');
          //this.props.authenticateUser();
        }
      })
      .catch(error => {
        if(error.response.status === 404) {
          this.setState({visible: true, isLoading: false});
        }
        localStorage.setItem('authenticated', ' false');
        localStorage.setItem('authenticatedAdmin', 'false');
      });
    }
    
  }

  componentDidMount() {
    localStorage.setItem('authenticated', 'false');
    localStorage.setItem('authenticatedAdmin', 'false');
  }

  render() {
    return( 
      <div className='container'>
        <div>
          <Card id='login'>
            <CardBody>
              <div className='centered'><h4 className='text-danger'><img alt='IECLUBLOGO' src={iec} height='5%' width='5%' /> Inside The Club</h4></div>
              <h4 className='centered'>Sign In</h4>
              <Alert color='danger' isOpen={this.state.visible} toggle={this.onDismiss}>
                Invalid username and/or password.
              </Alert>
              <Alert color="light" isOpen={this.state.isLoading}>
                Verifying your login credentials, please wait...
              </Alert>
              <Form>
                <FormGroup>
                  {/* <Label for="studNum">Student Number</Label> */}
                  <Input type="text" name="studNum" id="student_number" onChange={this.onChange} placeholder="Student Number" />
                </FormGroup>
                <FormGroup>
                  {/* <Label for="password">Password</Label> */}
                  <Input type="password" name="password" id="password" onChange={this.onChange} placeholder='Password' />
                </FormGroup>
                <Button color='link' href='/signup'>Don't have an account? Sign up here.</Button>
                <div className='centered'><Button outline color='danger' onClick={this.logIn}>Login</Button></div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapActionsToProps = {
  authenticateUser: authenticate
};

export default connect(mapStateToProps, mapActionsToProps)(Login);