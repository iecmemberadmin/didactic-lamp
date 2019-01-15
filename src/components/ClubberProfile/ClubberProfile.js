import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class ClubberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClubber: {},
      detailsModal: false,
      reaffModal: false,
      reaffDetailsModal: false,
      isReaffActive: false,
      isReaffed: false,
      reaffDetails: {}
    }
  }

  componentWillMount() {
    console.log(localStorage.getItem('student_number'));
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`)
    .then(response => {
      if(response.status === 200) {
        console.log(response.data);
        this.setState({activeClubber: response.data});
      }
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

  toggleDetailsModal = () => {
    this.setState({detailsModal: !this.state.detailsModal});
  }

  toggleReaffModal = () => {
    if(this.state.reaffModal === true) {
      window.location.reload();
    }else {
      this.setState({reaffModal: !this.state.reaffModal});
    }
  }

  toggleReaffDetailsModal = () => {
    this.setState({reaffDetailsModal: !this.state.reaffDetailsModal});
  }

  submitReaff = () => {
    axios.put(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`, this.state.activeClubber)
    .then(response => {
      console.log(response);
      axios.post('https://clubberdb-api.herokuapp.com/reaff/', {
        'clubber': this.state.activeClubber.student_number,
        'last_name': this.state.activeClubber.last_name,
        'updated_db': true,
        'submitted_docs': false,
        'paid_fee': false
      })
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(error => {
        console.log('done with post');
      });
    }).catch(error => {
      console.log('done with put');
    });
  }

  onChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let activeClubber = this.state.activeClubber;
    activeClubber[name] = value;
    this.setState({activeClubber: activeClubber});
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          {this.state.activeClubber !== {} && <Card>
            <CardBody>
              <h3 className='centered' style={{color: 'red'}}>Clubber Profile</h3>
              <CardTitle><h4>{this.state.activeClubber.first_name} {this.state.activeClubber.last_name}</h4></CardTitle>
              <CardSubtitle>{this.state.activeClubber.student_number} <br/> {this.state.activeClubber.degree_program}</CardSubtitle>
              <br/>
              <CardText>
                <i>{this.state.activeClubber.position} {this.state.activeClubber.project !== 'N/A' && '(' + this.state.activeClubber.project + ')'} <br/> {this.state.activeClubber.committee}</i> 
                <br/>
                <br/>
                {this.state.activeClubber.mobile_number}
                <br/>
                {this.state.activeClubber.email_address}
                <br/>
                {this.state.activeClubber.present_address}
              </CardText>
              <Button color='danger' onClick={this.toggleDetailsModal}>View Full Details</Button>
              <br/>
              <br/>
              {this.state.isReaffActive && !this.state.isReaffed &&
              <div>
                Reaff for this semester is now open!
                <Button color='link' onClick={this.toggleReaffModal}>Click here for more details.</Button>
              </div>
              }
              {this.state.isReaffActive && this.state.isReaffed &&
              <div>
                Thank you for submitting your application for this sem's Reaff!<br/>
                <Button color='link' onClick={this.toggleReaffDetailsModal}>Click here to view your progress in the Reaff requirements.</Button>
              </div>
              }
            </CardBody>
          </Card>}
          <br/>
          <Modal isOpen={this.state.reaffDetailsModal} toggle={this.toggleReaffDetailsModal}>
            <ModalHeader toggle={this.toggleReaffDetailsModal}>Your Reaff Progress</ModalHeader>
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>Student Number</th>
                    <th>Updated Database Info?</th>
                    <th>Submitted Form 5 + ID?</th>
                    <th>Paid Reaff Fee?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.activeClubber.student_number}</td>
                    <td>{this.state.reaffDetails.updated_db ? 'Yes' : 'No'}</td>
                    <td>{this.state.reaffDetails.submitted_docs ? 'Yes' : 'No'}</td>
                    <td>{this.state.reaffDetails.paid_fee ? 'Yes' : 'No'}</td>
                  </tr>
                </tbody>
              </Table>
              <br/>
              <i><b>NOTES:</b><br/>- Submit your scanned copy of Form 5 + ID to member.admin@upieclub.org or photocopy to the Member Administration Team, or to your batch rep. <br/>- Pay the Reaff Fee of PHP 130 to the Member Administration Team, or to your batch rep.</i>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggleReaffDetailsModal}>Done</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.reaffModal} toggle={this.toggleReaffModal} size='lg'>
            <ModalHeader toggle={this.toggleReaffModal}>Update Profile</ModalHeader>
            <ModalBody>
            Kindly update all the necessary information before you proceed.
            <br/>
            For uneditable information, contact the Member Administration Team to give the necessary edits for the said information.             
            <br/>
            <br/>
            <Table>
                <thead>
                  <tr><i><h5>Personal Information</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='first_name' onChange={this.onChange} value={this.state.activeClubber.first_name}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Middle Name</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='first_name' onChange={this.onChange} value={this.state.activeClubber.middle_name}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='last_name' onChange={this.onChange} value={this.state.activeClubber.last_name}/>
                      </FormGroup>
                    </td>
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
                    <td>
                      <FormGroup>
                        <Input type='text' name='degree_program' onChange={this.onChange} value={this.state.activeClubber.degree_program}/>
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
                <br />
                <thead>
                  <tr><i><h5>Contact Details</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Mobile Number</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='mobile_number' onChange={this.onChange} value={this.state.activeClubber.mobile_number}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Email Address</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='email_address' onChange={this.onChange} value={this.state.activeClubber.email_address}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Present Address</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='present_address' onChange={this.onChange} value={this.state.activeClubber.present_address}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Permanent Address</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='permanent_address' onChange={this.onChange} value={this.state.activeClubber.permanent_address}/>
                      </FormGroup>
                    </td>
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
                    <td>
                      <FormGroup>
                        <Input type='text' name='emergency_name' onChange={this.onChange} value={this.state.activeClubber.emergency_name}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Relationship</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='emergency_relationship' onChange={this.onChange} value={this.state.activeClubber.emergency_relationship}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Contact Number</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='emergency_contact' onChange={this.onChange} value={this.state.activeClubber.emergency_contact}/>
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" href='/profile'>Cancel</Button>
              <Button color="success" onClick={this.submitReaff}>Confirm and Submit Reaff Application</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.detailsModal} toggle={this.toggleDetailsModal} size='lg'>
            <ModalHeader toggle={this.toggleDetailsModal}>Clubber Profile</ModalHeader>
            <ModalBody>
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
              <Button color="success" onClick={this.toggleDetailsModal}>Done</Button>
            </ModalFooter>
          </Modal>
        </Container>      
      </div>
    );
  }
};

export default ClubberProfile;