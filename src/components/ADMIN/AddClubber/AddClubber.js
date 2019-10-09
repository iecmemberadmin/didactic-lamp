import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import NavMenu from "../NavMenu/NavMenu";
import axios from "axios";

let COMMITTEES = [
  "Executive",
  "Academics",
  "Externals",
  "Extracurricular",
  "Finance",
  "Internals",
  "Membership",
  "Publicity"
];

let POSITIONS = [
  "President",
  "Vice President",
  "Executive Secretary",
  "Associate Secretary",
  "Director",
  "Project Manager",
  "Member"
];

class AddClubber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      committeeDropdown: false,
      positionsDropdown: false,
      committee: "",
      position: "",
      student_number: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      nick_name: "",
      project: "",
      birthday: "",
      degree_program: "",
      mobile_number: "",
      email_address: "",
      present_address: "",
      permanent_address: "",
      emergency_name: "",
      emergency_contact: "",
      emergency_relationship: "",
      password: "",
      confirmPassword: ""
    };
  }

  toggleCommittee = () => {
    this.setState({ committeeDropdown: !this.state.committeeDropdown });
  };

  togglePositions = () => {
    this.setState({ positionsDropdown: !this.state.positionsDropdown });
  };

  getCommittee = committee => {
    this.setState({ committee: committee });
  };

  getPosition = position => {
    this.setState({ position: position });
  };

  onChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
  };

  newDismissSuccessAlert = () => {
    this.setState({ position: [] });
  };

  addClubber = () => {
    axios
      .post("https://clubberdb-api.herokuapp.com/clubbers/", {
        student_number: this.state.student_number,
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        nick_name: this.state.nick_name,
        committee: this.state.committee,
        position: this.state.position,
        project: this.state.project,
        birthday: this.state.birthday,
        degree_program: this.state.degree_program,
        mobile_number: this.state.mobile_number,
        email_address: this.state.email_address,
        present_address: this.state.present_address,
        permanent_address: this.state.permanent_address,
        emergency_name: this.state.emergency_name,
        emergency_relationship: this.state.emergency_relationship,
        emergency_contact: this.state.emergency_contact
      })
      .then(response => {
        if (response.status === 201) {
          console.log("it works here");
          this.setState({
            student_number: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            nick_name: "",
            committee: "",
            position: "",
            project: "",
            birthday: "",
            degree_program: "",
            mobile_number: "",
            email_address: "",
            present_address: "",
            permanent_address: "",
            emergency_name: "",
            emergency_contact: "",
            emergency_relationship: "",
            password: "",
            confirmPassword: ""
          });
          window.scrollTo(0, 0);
        }
      });
  };

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          <h3>Add New Clubber</h3>
          <h5 style={{ color: "red" }}>
            Do not leave any field blank. All fields are required.
          </h5>
          <br />
          <h5>Login Credentials</h5>
          <Form>
            <FormGroup>
              <Label>Student Number</Label>
              <Input
                type="text"
                name="student_number"
                onChange={this.onChange}
                value={this.state.student_number}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="text"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="text"
                name="confirmPassword"
                onChange={this.onChange}
                value={this.state.confirmPassword}
              />
            </FormGroup>
          </Form>
          <br />
          <hr />
          <br />
          <h5>Personal Information</h5>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="Juan"
                    onChange={this.onChange}
                    value={this.state.first_name}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Nickname</Label>
                  <Input
                    type="text"
                    name="nick_name"
                    placeholder="Junjun"
                    onChange={this.onChange}
                    value={this.state.nick_name}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Middle Name</Label>
                  <Input
                    type="text"
                    name="middle_name"
                    placeholder="Santos"
                    onChange={this.onChange}
                    value={this.state.middle_name}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Dela Cruz"
                    onChange={this.onChange}
                    value={this.state.last_name}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <FormGroup>
                  <Label>Committee</Label>
                  <br />
                  <ButtonDropdown
                    isOpen={this.state.committeeDropdown}
                    toggle={this.toggleCommittee}
                  >
                    <DropdownToggle caret color="info">
                      {this.state.committee === ""
                        ? "Select Committee"
                        : this.state.committee}
                    </DropdownToggle>
                    <DropdownMenu>
                      {COMMITTEES.map((item, i) => {
                        return (
                          <DropdownItem onClick={() => this.getCommittee(item)}>
                            {item}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </ButtonDropdown>
                </FormGroup>
              </Col>
              <Col xs="auto">
                <FormGroup>
                  <Label>Position</Label>
                  <br />
                  <ButtonDropdown
                    isOpen={this.state.positionsDropdown}
                    toggle={this.togglePositions}
                  >
                    <DropdownToggle caret color="info">
                      {this.state.position === ""
                        ? "Select Position"
                        : this.state.position}
                    </DropdownToggle>
                    <DropdownMenu>
                      {POSITIONS.map((item, i) => {
                        return (
                          <DropdownItem onClick={() => this.getPosition(item)}>
                            {item}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </ButtonDropdown>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Project</Label>
                  <Input
                    type="text"
                    name="project"
                    onChange={this.onChange}
                    value={this.state.project}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Birthday</Label>
                  <Input
                    type="text"
                    name="birthday"
                    placeholder="FORMAT: YYYY-MM-DD"
                    onChange={this.onChange}
                    value={this.state.birthday}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    type="text"
                    name="email_address"
                    onChange={this.onChange}
                    value={this.state.email_address}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <Input
                    type="text"
                    name="mobile_number"
                    onChange={this.onChange}
                    value={this.state.mobile_number}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Degree Program</Label>
              <Input
                type="text"
                name="degree_program"
                onChange={this.onChange}
                value={this.state.degree_program}
              />
            </FormGroup>
            <FormGroup>
              <Label>Present Address</Label>
              <Input
                type="text"
                name="present_address"
                onChange={this.onChange}
                value={this.state.present_address}
              />
            </FormGroup>
            <FormGroup>
              <Label>Permanent Address</Label>
              <Input
                type="text"
                name="permanent_address"
                onChange={this.onChange}
                value={this.state.permanent_address}
              />
            </FormGroup>
            <FormGroup>
              <Label>Emergency Contact Person</Label>
              <Input
                type="text"
                name="emergency_name"
                onChange={this.onChange}
                value={this.state.emergency_name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Relationship</Label>
              <Input
                type="text"
                name="emergency_relationship"
                onChange={this.onChange}
                value={this.state.emergency_relationship}
              />
            </FormGroup>
            <FormGroup>
              <Label>Contact Number</Label>
              <Input
                type="text"
                name="emergency_contact"
                onChange={this.onChange}
                value={this.state.emergency_contact}
              />
            </FormGroup>
          </Form>
          <Button color="success" onClick={this.addClubber}>
            Add Clubber
          </Button>
        </Container>
      </div>
    );
  }
}

export default AddClubber;
