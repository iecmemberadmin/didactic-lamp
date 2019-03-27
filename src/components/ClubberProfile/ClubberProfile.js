import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import axios from 'axios';

class ClubberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClubber: {},
      detailsModal: false,
      reaffModal: false,
      contractModal: false,
      reaffDetailsModal: false,
      passwordModal: false,
      isReaffActive: false,
      isReaffed: false,
      reaffDetails: {},
      unequalAlert: false,
      successPasswordAlert: false,
      successInfoAlert: false,
      editMode: false
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
    if(this.state.detailsModal) {
      window.location.reload();
    }else {
      this.setState({detailsModal: !this.state.detailsModal});
    }
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

  togglePasswordModal = () => {
    this.setState({passwordModal: !this.state.passwordModal});
  }

  toggleEditMode = () => {
    if(this.state.editMode) {
      let temp = JSON.parse(JSON.stringify(this.state.tempEdit));
      this.setState({editMode: false});
      this.setState({activeClubber: temp});
    }else {
      let temp = JSON.parse(JSON.stringify(this.state.activeClubber));
      this.setState({editMode: true, tempEdit: temp});
    }
  }

  submitReaff = () => {
    axios.put(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`, this.state.activeClubber)
    .then(response => {
      console.log(response);
      axios.post('https://clubberdb-api.herokuapp.com/reaff/', {
        'clubber': this.state.activeClubber.student_number,
        'last_name': this.state.activeClubber.last_name,
        'updated_db': true,
        'read_contract': true,
        'submitted_docs': false,
        'paid_fee': false,
        'ew_participation': false,
        'ew_jersey': false,
        'nick_name': this.state.activeClubber.nick_name
      })
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(error => {
        
      });
    }).catch(error => {
      
    });
  }

  updateInfo = () => {
    axios.put(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`, this.state.activeClubber)
    .then(response => {
      console.log(response);
      this.setState({successInfoAlert: true, detailsModal: false});
    });
  }

  onChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let activeClubber = this.state.activeClubber;
    activeClubber[name] = value;
    this.setState({activeClubber: activeClubber});
  }

  toggleContractModal = () => {
    this.setState({contractModal: !this.state.contractModal});
  }

  goToContract = () => {
    this.setState({contractModal: true, reaffModal: false});
  }

  goBackToInfo = () => {
    this.setState({reaffModal: true, contractModal: false});
  }

  dismissUnequalAlert = () => {
    this.setState({unequalAlert: false});
  }

  dismissSuccessPasswordAlert = () => {
    this.setState({successPasswordAlert: false});
  }
  
  dismissSuccessInfoAlert = () => {
    this.setState({successInfoAlert: false});
  }

  changePassword = () => {
    this.setState({unequalAlert: false});
    if(this.state.activeClubber.newPassword !== this.state.activeClubber.confirmNewPassword) {
      this.setState({unequalAlert: true});
    }else {
      axios.put(`https://clubberdb-api.herokuapp.com/auth/${this.state.activeClubber.student_number}/`, {
        'clubber': this.state.activeClubber.student_number,
        'password': this.state.activeClubber.newPassword
      }).then(response => {
        this.setState({passwordModal: false, successPasswordAlert: true});
        console.log(response);
      })
    }
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          {this.state.activeClubber !== {} && <Card>
            <CardBody>
              <h3 className='centered' style={{color: 'red'}}>Clubber Profile</h3>
              <Alert color="success" isOpen={this.state.successPasswordAlert} toggle={this.dismissSuccessPasswordAlert}>
                Successfully changed password.
              </Alert>
              <Alert color="success" isOpen={this.state.successInfoAlert} toggle={this.dismissSuccessInfoAlert}>
                Successfully updated profile.
              </Alert>
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
              {' '}
              <Button color='warning' onClick={this.togglePasswordModal}>Change Password</Button>
              <br/>
              <br/>
              {this.state.isReaffActive && !this.state.isReaffed &&
              <div>
                Reaff for this semester is now open!
                <Button color='link' onClick={this.toggleReaffModal}>Click here to Reaff.</Button>
              </div>
              }
              {this.state.isReaffed &&
              <div>
                Thank you for submitting your application for this sem's Reaff!<br/>
                <Button color='link' onClick={this.toggleReaffDetailsModal}>Click here to view your progress in the Reaff requirements.</Button>
              </div>
              }
            </CardBody>
          </Card>}
          <br/>
          <Modal isOpen={this.state.passwordModal} toggle={this.togglePasswordModal} size='lg'>
            <ModalHeader toggle={this.togglePasswordModal}>Change Password</ModalHeader>
            <ModalBody>
              <Alert color="danger" isOpen={this.state.unequalAlert} toggle={this.dismissUnequalAlert}>
                Passwords do not match.
              </Alert>
              <FormGroup>
                <Label>New Password</Label>
                <Input type='password' name='newPassword' onChange={this.onChange} value={this.state.activeClubber.newPassword}/>
              </FormGroup>
              <FormGroup>
                <Label>Confirm New Password</Label>
                <Input type='password' name='confirmNewPassword' onChange={this.onChange} value={this.state.activeClubber.confirmNewPassword}/>
              </FormGroup>
              <Button color='success' onClick={this.changePassword}>Confirm</Button>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.reaffDetailsModal} toggle={this.toggleReaffDetailsModal} size='lg'>
            <ModalHeader toggle={this.toggleReaffDetailsModal}>Your Reaff Progress</ModalHeader>
            <ModalBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Student Number</th>
                    <th>Updated Database Info?</th>
                    <th>Read Contract?</th>
                    <th>Submitted Form 5 + ID?</th>
                    <th>Paid Reaff Fee?</th>
                    {/*<th>Answered the EW Participation Survey?</th>
                    <th>Answered the EW Jersey/Tickets Survey?</th>*/}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.activeClubber.student_number}</td>
                    <td>{this.state.reaffDetails.updated_db ? 'Yes' : 'No'}</td>
                    <td>{this.state.reaffDetails.read_contract ? 'Yes' : 'No'}</td>
                    <td>{this.state.reaffDetails.submitted_docs ? 'Yes' : 'No'}</td>
                    <td>{this.state.reaffDetails.paid_fee ? 'Yes' : 'No'}</td>
                    {/* <td>{this.state.reaffDetails.ew_participation ? 'Yes' : 'No'}</td>
                    <td>{this.state.reaffDetails.ew_jersey ? 'Yes' : 'No'}</td> */}
                  </tr>
                </tbody>
              </Table>
              <br/>
              <i><b>NOTES:</b><br/>- Submit your scanned copy of Form 5 + ID to member.admin@upieclub.org or head to the tambayan and have your Form 5 + ID scanned. For scanning schedules, the team will post when the scanner will be ready at the tambayan. <br/>- Pay the Reaff Fee of PHP 150 to the Member Administration Team, or to your batch rep.<br/>- Answer the <a href='https://tinyurl.com/MyRoleThisEWOC30' target='_blank'>Engg Week Participation Survey</a> and <a href='https://tinyurl.com/EWOC30jerseytix' target='_blank'>Engg Week Jersey/Tickets Survey</a>.</i>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggleReaffDetailsModal}>Done</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.contractModal} toggle={this.toggleContractModal} size='lg'>
            <ModalHeader toggle={this.toggleContractModal}>Contract</ModalHeader>
            <ModalBody>
              <i>As a Clubber, I fully understand and agree to the following:</i>
              <ul>
                <li>
                  To complete the reaffiliation process, the following requirements must be met by the deadline:
                  <ul>
                    <li>Submission of Form 5 and ID</li>
                    <li>Database Information Update</li>
                    <li>Payment of Reaffiliation Fee of Php 150</li>
                    <li>Accomplishment of the Engineering Week Participation Survey</li>
                    <li>Accomplishment of the Engineering Week Jersey/Tickets Survey</li>
                  </ul>
                </li>
                <li>
                  A member's failure to complete the reaffiliation process (i.e. full reaffiliation) will automatically result in a status of <b>INACTIVE</b> for the semester, regardless of the CRS-evaluated result from the previous semester
                </li>
                <li>
                  A member's failure to attend at least <b>ONE</b> (1) general meeting or <b>TWO</b> (2) committee meetings <b>without any valid excuse*</b> will automatically result in a status of INACTIVE for the semester, regardless of the CRS-evaluated result from the previous semester 
                </li>
                <li>
                  A fully reaffiliated member's status will be re-evaluated at the end of the semester through the Clubber Rating Scheme, with the following components: Event Involvement and Member Assessment
                  <ul>
                    <li>A satisfactory rating of 60 or greater will result in an <span style={{color: 'green'}}>ACTIVE</span> status</li>
                    <li>A passable rating of [50, 60) will result in a <span style={{color: 'orange'}}>PROBATIONARY</span> status</li>
                    <li>An unsatisfactory rating of less than 50 will result in an <span style={{color: 'red'}}>INACTIVE</span> status</li>
                  </ul>
                </li>
                <li>
                  A member with Probationary status will be monitored by the Executive Committee; failure to reach an active status in the rest of the member's succeeding semesters will automatically tag the member as <b>INACTIVE</b>
                </li>
                <li>
                  A member's attainment of a total of <b>TWO</b> (2) semesters tagged as <b>INACTIVE</b>, regardless if theses semesters are consecutive or not, will result in the member being a candidate for <b>TERMINATION</b> of membership
                </li>
                <li>
                  Candidates for termination of membership may appeal to the Executive Committee, which will then deliberate on the cases and release the official results thereafter
                </li>
                <li>
                  Those officially stripped of their membership must undergo and pass the application process to be readmitted to the organization
                </li>
              </ul>
              <br />
              <p>By clicking the submit button, I am confirming that I have read and understood the contract, and I give consent to have my basic information and contact details available in the directory.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.goBackToInfo}>Back</Button>{' '}
              <Button color="success" onClick={this.submitReaff}>Confirm and Submit Reaff Application</Button>
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
            <Table responsive>
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
                <thead>
                  <tr><i><h5>Additional Info</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Car Capacity for Carpool (Write 0 if not applicable)</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='carpool_capacity' onChange={this.onChange} value={this.state.activeClubber.carpool_capacity}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>A/V Equipment (Put N/A if not applicable)</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='av_equipment' onChange={this.onChange} value={this.state.activeClubber.av_equipment}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Sports Equipment (Put N/A if not applicable)</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='sports_equipment' onChange={this.onChange} value={this.state.activeClubber.sports_equipment}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                  <th>Instruments (Put N/A if not applicable)</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='instruments' onChange={this.onChange} value={this.state.activeClubber.instruments}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>What are the subjects you are currently enrolled in for this semester?</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='current_subjects' onChange={this.onChange} value={this.state.activeClubber.current_subjects}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Who are your closest friends in IE Club?</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='closest_friends' onChange={this.onChange} value={this.state.activeClubber.closest_friends}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                  <th>Social Enterprise/NGO Recommendation for IEAid</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='ieaid_company' onChange={this.onChange} value={this.state.activeClubber.ieaid_company}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Contact Person (IEAid)</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='ieaid_contactperson' onChange={this.onChange} value={this.state.activeClubber.ieaid_contactperson}/>
                      </FormGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Contact Details (IEAid)</th>
                    <td>
                      <FormGroup>
                        <Input type='text' name='ieaid_contactdetails' onChange={this.onChange} value={this.state.activeClubber.ieaid_contactdetails}/>
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" href='/profile'>Cancel</Button>
              <Button color="info" onClick={this.goToContract}>Continue</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.detailsModal} toggle={this.toggleDetailsModal} size='lg'>
            <ModalHeader toggle={this.toggleDetailsModal}>Clubber Profile</ModalHeader>
            <ModalBody>
              {this.state.editMode ? <Button color='secondary' onClick={this.toggleEditMode}>Cancel</Button> : <Button color='warning' onClick={this.toggleEditMode}>Edit Info</Button>}
              <br/>
              <br/>
              <Table responsive>
                <thead>
                  <tr><i><h5>Personal Information</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>First Name</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='first_name' onChange={this.onChange} value={this.state.activeClubber.first_name}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.first_name}</td>}
                  </tr>
                  <tr>
                    <th>Nick Name</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='nick_name' onChange={this.onChange} value={this.state.activeClubber.nick_name}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.nick_name}</td>}
                  </tr>
                  <tr>
                    <th>Middle Name</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='middle_name' onChange={this.onChange} value={this.state.activeClubber.middle_name}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.middle_name}</td>}
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='last_name' onChange={this.onChange} value={this.state.activeClubber.last_name}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.last_name}</td>}
                  </tr>
                  <tr>
                    <th>Student Number</th>
                    <td>{this.state.activeClubber.student_number}</td>
                  </tr>
                  <tr>
                    <th>Birthday {this.state.editMode ? 
                    '(Format: YYYY-MM-DD)' : ''}</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='birthday' onChange={this.onChange} value={this.state.activeClubber.birthday}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.birthday}</td>}
                  </tr>
                  <tr>
                    <th>Degree Program</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='degree_program' onChange={this.onChange} value={this.state.activeClubber.degree_program}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.degree_program}</td>}
                  </tr>
                </tbody>
                <br />
                <thead>
                  <tr><i><h5>Contact Details</h5></i></tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Mobile Number</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='mobile_number' onChange={this.onChange} value={this.state.activeClubber.mobile_number}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.mobile_number}</td>}
                  </tr>
                  <tr>
                    <th>Email Address</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='email_address' onChange={this.onChange} value={this.state.activeClubber.email_address}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.email_address}</td>}
                  </tr>
                  <tr>
                    <th>Present Address</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='present_address' onChange={this.onChange} value={this.state.activeClubber.present_address}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.present_address}</td>}
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
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='emergency_name' onChange={this.onChange} value={this.state.activeClubber.emergency_name}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.emergency_name}</td>}
                  </tr>
                  <tr>
                    <th>Relationship</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='emergency_relationship' onChange={this.onChange} value={this.state.activeClubber.emergency_relationship}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.emergency_relationship}</td>}
                  </tr>
                  <tr>
                    <th>Contact Number</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='emergency_contact' onChange={this.onChange} value={this.state.activeClubber.emergency_contact}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.emergency_contact}</td>}
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              {this.state.editMode ? <Button color='warning' onClick={this.updateInfo}>Submit Changes</Button> : ' '}
              <Button color="success" onClick={this.toggleDetailsModal}>Done</Button>
            </ModalFooter>
          </Modal>
        </Container>      
      </div>
    );
  }
};

export default ClubberProfile;