import React, {Component} from 'react';
import axios from 'axios';
import {Container, FormGroup, Input, Button, Label, Alert} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loadingAlert: false,
      successAlert: false
    }
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  addAdmin = () => {
    this.setState({loadingAlert: true, successAlert: false});
    axios.post('https://clubberdb-api.herokuapp.com/adminauth/', {
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      this.setState({loadingAlert: false, successAlert: true, username: '', password: ''});
    });
  }

  dismissSuccessAlert = () => {
    this.setState({successAlert: false});
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Add Admin Credentials</h3>
          <Alert color='secondary' isOpen={this.state.loadingAlert}>
            Adding admin credentials, please wait ...
          </Alert>
          <Alert color='success' isOpen={this.state.successAlert} toggle={this.dismissSuccessAlert}>
            Admin credentials successfully added. 
          </Alert>
          <FormGroup>
            <Label>Username</Label>
            <Input type='text' name='username' onChange={this.onChange} value={this.state.username} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type='password' name='password' onChange={this.onChange} value={this.state.password} />
          </FormGroup>
          <Button color='success' onClick={this.addAdmin}>Submit</Button>
        </Container>
      </div>
    )
  }
}

export default AddAdmin;