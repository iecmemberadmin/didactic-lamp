import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';

class ViewRegistered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubbers: [],
      detailsModal: false,
      activeClubber: {}
    };
  }

  toggleDetailsModal = (clubber) => {
    this.setState({detailsModal: true, activeClubber: clubber})
  } 

  toggle = () => {
    this.setState({detailsModal: false});
  }

  deleteClubber = (activeClubber) => {
    let student_number = activeClubber.student_number;
    axios.delete(`https://clubberdb-api.herokuapp.com/clubbers/${activeClubber.student_number}/`)
    .then(response => {
      if(response.status === 204) {
        this.setState({
          activeClubber: {},
          detailsModal: false,
          clubbers: this.state.clubbers.filter((item, i) => {
            if(student_number === item.student_number) {
              return false;
            }
            return true;
          })
        });
      }
    })
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      if(response.status === 200) {
        this.setState({clubbers: response.data});
      }
    })
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Registered Clubbers</h3>
          <Modal isOpen={this.state.detailsModal} toggle={this.toggle} size='lg'>
            <ModalHeader toggle={this.toggle}><h4 style={{color: 'red'}}>Clubber Details: {this.state.activeClubber.nick_name} {this.state.activeClubber.last_name}</h4></ModalHeader>
            <ModalBody>
              <Button color='danger' onClick={() => this.deleteClubber(this.state.activeClubber)}>Delete Clubber</Button>
              <br />
              <br />
              <Table>
                <thead>
                  <tr><i><h5>Personal Information</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>{this.state.activeClubber.first_name}</td>
                  </tr>
                  <tr>
                    <th>Middle Name</th>
                    <td>{this.state.activeClubber.middle_name}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{this.state.activeClubber.last_name}</td>
                  </tr>
                  <tr>
                    <th>Student Number</th>
                    <td>{this.state.activeClubber.student_number}</td>
                  </tr>
                  <tr>
                    <th>Birthday</th>
                    <td>{this.state.activeClubber.birthday}</td>
                  </tr>
                  <tr>
                    <th>Degree Program</th>
                    <td>{this.state.activeClubber.degree_program}</td>
                  </tr>
                </tbody>
                <br />
                <thead>
                  <tr><i><h5>Contact Details</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Mobile Number</th>
                    <td>{this.state.activeClubber.mobile_number}</td>
                  </tr>
                  <tr>
                    <th>Email Address</th>
                    <td>{this.state.activeClubber.email_address}</td>
                  </tr>
                  <tr>
                    <th>Present Address</th>
                    <td>{this.state.activeClubber.present_address}</td>
                  </tr>
                </tbody>
                <br />
                <thead>
                  <tr><i><h5>Clubber Profile</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Committee</th>
                    <td>{this.state.activeClubber.committee}</td>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <td>{this.state.activeClubber.position}</td>
                  </tr>
                  <tr>
                    <th>Project</th>
                    <td>{this.state.activeClubber.project}</td>
                  </tr>
                </tbody>
                <br />
                <thead>
                  <tr><i><h5>Person to contact in case of Emergency</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Contact Person</th>
                    <td>{this.state.activeClubber.emergency_name}</td>
                  </tr>
                  <tr>
                    <th>Relationship</th>
                    <td>{this.state.activeClubber.emergency_relationship}</td>
                  </tr>
                  <tr>
                    <th>Contact Number</th>
                    <td>{this.state.activeClubber.emergency_contact}</td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Exit</Button>
            </ModalFooter>
          </Modal>
          <Table striped hover responsive> 
            <thead>
              <tr>
                <th>Student Number</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Committee</th>
                <th>Position</th>
                <th>Project</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            {this.state.clubbers.map((item, i) => {
              return(
                <tr key={i}>
                  <td>{item.student_number}</td>
                  <td>{item.last_name}</td>
                  <td>{item.first_name}</td>
                  <td>{item.committee}</td>
                  <td>{item.position}</td>
                  <td>{item.project}</td>
                  <td><Button color='success' onClick={() => this.toggleDetailsModal(item)}>View Details</Button></td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
};

export default ViewRegistered;
