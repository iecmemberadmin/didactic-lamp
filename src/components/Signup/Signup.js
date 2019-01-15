import React, {Component} from 'react';
import axios from 'axios';
import {Container, Form, FormGroup, Label, Input, Row, Col, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button} from 'reactstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  signup = () => {
    console.log(this.state);
    axios.post('https://clubberdb-api.herokuapp.com/clubbers/', {
      student_number: this.state.student_number,
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      nick_name: this.state.nick_name,
      birthday: this.state.birthday,
      email_address: this.state.email_address,
      mobile_number: this.state.mobile_number,
      degree_program: this.state.degree_program,
      present_address: this.state.present_address,
      permanent_address: this.state.permanent_address,
      emergency_name: this.state.emergency_name,
      emergency_contact: this.state.emergency_contact,
      emergency_relationship: this.state.emergency_relationship,
      committee: 'Executive',
      project: 'Internals',
      position: 'Vice President'
    }).then(response => {
      console.log(response);
      axios.post('https://clubberdb-api.herokuapp.com/auth/', {
        clubber: this.state.student_number,
        password: this.state.password
      })
      .then(response => {
        this.props.history.push('/');
      });
    });
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  render() {
    return(
      <div>
        <Container>
          <a href='/'>Back to Login Page</a>
          <br/>
          <br/>
          <h3>Signup</h3>
          <h5 style={{color: 'red'}}>Do not leave any field blank. All fields are required.</h5>
          <br/>
          <h5>Login Credentials</h5>
          <Form>
            <FormGroup>
              <Label>Student Number</Label>
              <Input type='text' name='student_number' onChange={this.onChange} value={this.state.student_number}/>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input type='password' name='password' onChange={this.onChange} value={this.state.password}/>
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input type='password' name='confirmPassword' onChange={this.onChange} value={this.state.confirmPassword}/>
            </FormGroup>
          </Form>
          <br/>
          <hr/>
          <br/>
          <h5>Personal Information</h5>
          <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label>First Name</Label>
                <Input type='text' name='first_name' placeholder='Juan' onChange={this.onChange} value={this.state.first_name}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Nickname</Label>
                <Input type='text' name='nick_name' placeholder='Junjun' onChange={this.onChange} value={this.state.nick_name}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Middle Name</Label>
                <Input type='text' name='middle_name' placeholder='Santos' onChange={this.onChange} value={this.state.middle_name} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Last Name</Label>
                <Input type='text' name='last_name' placeholder='Dela Cruz' onChange={this.onChange} value={this.state.last_name}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>Birthday</Label>
                <Input type='text' name='birthday' placeholder='FORMAT: YYYY-MM-DD' onChange={this.onChange} value={this.state.birthday}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Email Address</Label>
                <Input type='text' name='email_address' onChange={this.onChange} value={this.state.email_address}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Mobile Number</Label>
                <Input type='text' name='mobile_number' onChange={this.onChange} value={this.state.mobile_number}/>
              </FormGroup>
            </Col>
          </Row>
            <FormGroup>
              <Label>Degree Program</Label>
              <Input type='text' name='degree_program' onChange={this.onChange} value={this.state.degree_program} placeholder='BS Industrial Engineering'/>
            </FormGroup>
            <FormGroup>
              <Label>Present Address</Label>
              <Input type='text' name='present_address' onChange={this.onChange} value={this.state.present_address}/>
            </FormGroup>
            <FormGroup>
              <Label>Permanent Address</Label>
              <Input type='text' name='permanent_address' onChange={this.onChange} value={this.state.permanent_address}/>
            </FormGroup>
            <FormGroup>
              <Label>Emergency Contact Person</Label>
              <Input type='text' name='emergency_name' onChange={this.onChange} value={this.state.emergency_name}/>
            </FormGroup>
            <FormGroup>
              <Label>Relationship</Label>
              <Input type='text' name='emergency_relationship' onChange={this.onChange} value={this.state.emergency_relationship}/>
            </FormGroup>
            <FormGroup>
              <Label>Contact Number</Label>
              <Input type='text' name='emergency_contact' onChange={this.onChange} value={this.state.emergency_contact}/>
            </FormGroup>
          </Form>
          <Button color='success' onClick={this.signup}>Signup</Button>
        </Container>
      </div>
    );
  }
};

export default Signup;