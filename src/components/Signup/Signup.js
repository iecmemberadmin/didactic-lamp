import React, {Component} from 'react';
import axios from 'axios';
import {Container, Form, FormGroup, Label, Input, Row, Col, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Alert} from 'reactstrap';

let CANDIES = [
  'Chocnut',
  'Choco Choco',
  'Flat Tops',
  'Potchi',
]

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thanksAlert: false,
      incompleteAlert: false,
      unmatchAlert: false,
      loadingAlert: false,
      student_number: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      nick_name: '',
      committee: '',
      position: '',
      project: '',
      birthday: '',
      degree_program: '',
      mobile_number: '',
      email_address: '',
      present_address: '',
      permanent_address: '',
      emergency_name: '',
      emergency_contact: '',
      emergency_relationship: '',
      password: '',
      confirmPassword: '',
      av_equipment: '',
      sports_equipment: '',
      instruments: '',
      carpool_capacity: '',
      current_subjects: '',
      closest_friends: '',
      ieaid_company: '',
      ieaid_contactperson: '',
      ieaid_contactdetails: '',
      candy: '',
      candyDropdown: false
    };
  }

  signup = () => {
    console.log(this.state);
    window.scrollTo(0, 0);
    this.setState({loadingAlert: true});
    if(this.state.student_number === '' || this.state.password === '' || this.state.first_name === '' || this.state.middle_name === '' || this.state.last_name === '' || this.state.nick_name === '' || this.state.birthday === '' || this.state.email_address === '' || this.state.mobile_number === '' || this.state.degree_program === '' || this.state.present_address === '' || this.state.permanent_address === '' || this.state.emergency_contact === '' || this.state.emergency_name === '' || this.state.emergency_relationship === '' || this.state.carpool_capacity === '' || this.state.av_equipment === '' || this.state.sports_equipment === '' || this.state.instruments === '' || this.state.current_subjects === '' || this.state.closest_friends === '' || this.state.ieaid_company === '' || this.state.ieaid_contactdetails === '' || this.state.ieaid_contactperson === '' || this.state.candy === '') {
      this.setState({incompleteAlert: true, loadingAlert: false});
    }else if(this.state.password !== this.state.confirmPassword) {
      this.setState({unmatchAlert: true, loadingAlert: false});
    }else {
      axios.post('https://clubberdb-api.herokuapp.com/pending/', {
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
        committee: 'TBA',
        project: 'N/A',
        position: 'TBA',
        password: this.state.password,
        carpool_capacity: parseInt(this.state.carpool_capacity, 10),
        av_equipment: this.state.av_equipment,
        sports_equipment: this.state.sports_equipment,
        instruments: this.state.instruments,
        current_subjects: this.state.current_subjects,
        closest_friends: this.state.closest_friends,
        ieaid_company: this.state.ieaid_company,
        ieaid_contactperson: this.state.ieaid_contactperson,
        ieaid_contactdetails: this.state.ieaid_contactdetails,
        candy: this.state.candy
      }).then(response => {
        console.log(response);
        this.setState({
          thanksAlert: true,
          loadingAlert: false,
          student_number: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          nick_name: '',
          committee: '',
          position: '',
          project: '',
          birthday: '',
          degree_program: '',
          mobile_number: '',
          email_address: '',
          present_address: '',
          permanent_address: '',
          emergency_name: '',
          emergency_contact: '',
          emergency_relationship: '',
          password: '',
          confirmPassword: '',
          carpool_capacity: '',
          av_equipment: '',
          sports_equipment: '',
          instruments: '',
          current_subjects: '',
          closest_friends: '',
          ieaid_company: '',
          ieaid_contactperson: '',
          ieaid_contactdetails: '',
          candy: ''
        });
      });
    }
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  dismissThanksAlert = () => {
    this.setState({thanksAlert: false});
  }

  dismissIncompleteAlert = () => {
    this.setState({incompleteAlert: false});
  }

  dismissUnmatchAlert = () => {
    this.setState({unmatchAlert: false});
  }

  toggleCandy = () => {
    this.setState({candyDropdown: !this.state.candyDropdown});
  }

  getCandy = (candy) => {
    this.setState({candy: candy});
  }

  render() {
    return(
      <div>
        <Container>
          <a href='/'>Back to Login Page</a>
          <br/>
          <br/>
          <h3>Signup</h3>
          <Alert color="info" isOpen={this.state.thanksAlert} toggle={this.dismissThanksAlert}>
            Thank you for signing up! The team will yet to confirm the information you gave and you may then login using your credentials. Don't hesitate to message the Member Administration team for questions and concerns!
          </Alert>
          <Alert color="danger" isOpen={this.state.incompleteAlert} toggle={this.dismissIncompleteAlert}>
            Please fill all fields with the necessary information.
          </Alert>
          <Alert color="danger" isOpen={this.state.unmatchAlert} toggle={this.dismissUnmatchAlert}>
            Passwords do not match.
          </Alert>
          <Alert color="warning" isOpen={this.state.loadingAlert}>
            Signing up, please wait ...
          </Alert>
          <br/>
          <h5>Login Credentials</h5>
          <Form>
            <FormGroup>
              <Label>Student Number (without dash)</Label>
              <Input type='text' name='student_number' placeholder='201XXXXXX' onChange={this.onChange} value={this.state.student_number}/>
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
          <br/>
          <hr/>
          <br/>
          <h5>Additional Info</h5>
          <Form>
            <FormGroup>
              <Label>Car Capacity for Carpool (Write 0 if not applicable)</Label>
              <Input type='text' name='carpool_capacity' onChange={this.onChange} value={this.state.carpool_capacity}/>
            </FormGroup>
            <FormGroup>
              <Label>A/V Equipment (Put N/A if not applicable)</Label>
              <Input type='text' name='av_equipment' onChange={this.onChange} value={this.state.av_equipment}/>
            </FormGroup>
            <FormGroup>
              <Label>Sports Equipment (Put N/A if not applicable)</Label>
              <Input type='text' name='sports_equipment' onChange={this.onChange} value={this.state.sports_equipment}/>
            </FormGroup>
            <FormGroup>
              <Label>Instruments (Put N/A if not applicable)</Label>
              <Input type='text' name='instruments' onChange={this.onChange} value={this.state.instruments}/>
            </FormGroup>
            <FormGroup>
              <Label>What are the subjects you are currently enrolled in for this semester?</Label>
              <Input type='text' name='current_subjects' onChange={this.onChange} value={this.state.current_subjects}/>
            </FormGroup>
            <Row>
              <Col xs='auto'>
              <FormGroup>
                <Label>Pick a Candy!</Label><br />
                <ButtonDropdown isOpen={this.state.candyDropdown} toggle={this.toggleCandy}>
                  <DropdownToggle caret color='danger'>
                  {this.state.candy === '' ? 'Select Candy' : this.state.candy}
                  </DropdownToggle>
                  <DropdownMenu>
                    {CANDIES.map((item, i) => {
                      return(<DropdownItem onClick={() => this.getCandy(item)}>{item}</DropdownItem>)
                    })}
                  </DropdownMenu>
                </ButtonDropdown>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label>Who are your closest friends in IE Club?</Label>
                <Input type='text' name='closest_friends' onChange={this.onChange} value={this.state.closest_friends}/>
              </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label><b>(IEAid)</b> Do you know any social enterprise/NGOs/etc that needs IE assistance? If yes, please give their name and a short description of the company (Put N/A if not none)</Label>
              <Input type='text' name='ieaid_company' onChange={this.onChange} value={this.state.ieaid_company}/>
            </FormGroup>
            <FormGroup>
              <Label><b>(IEAid)</b> Do you have a contact person in that company (Put N/A if none)</Label>
              <Input type='text' name='ieaid_contactperson' onChange={this.onChange} value={this.state.ieaid_contactperson}/>
            </FormGroup>
            <FormGroup>
              <Label><b>(IEAid)</b> What are their contact details? (Put N/A if none)</Label>
              <Input type='text' name='ieaid_contactdetails' onChange={this.onChange} value={this.state.ieaid_contactdetails}/>
            </FormGroup>
          </Form>
          <Button color='success' onClick={this.signup}>Signup</Button>
        </Container>
      </div>
    );
  }
};

export default Signup;