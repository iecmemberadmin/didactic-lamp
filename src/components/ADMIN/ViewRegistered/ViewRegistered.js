import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Alert, Label, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import axios from 'axios';

let COMMITTEES = [
  'Executive', 
  'Academics',
  'Externals',
  'Extracurricular',
  'Finance',
  'Internals',
  'Membership',
  'Publicity',
  'TBA'
]

let POSITIONS = [
  'President',
  'Vice President',
  'Executive Secretary',
  'Associate Secretary',
  'Director',
  'Project Manager',
  'Member',
  'TBA'
]

class ViewRegistered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      committeeDropdown: false,
      positionsDropdown: false,
      clubbers: [],
      search: [],
      detailsModal: false,
      activeClubber: {},
      editMode: false,
      search_query: '',
      tempEdit: {},
      loadingAlert: false,
      resetLoadingAlert: false,
      resetSuccessAlert: false
    };
  }

  toggleDetailsModal = (clubber) => {
    this.setState({detailsModal: true, activeClubber: clubber})
  } 

  toggle = () => {
    this.setState({detailsModal: false});
  }

  toggleCommittee = () => {
    this.setState({committeeDropdown: !this.state.committeeDropdown});
  }

  togglePositions = () => {
    this.setState({positionsDropdown: !this.state.positionsDropdown});
  }

  getCommittee = (committee) => {
    let activeClubber = this.state.activeClubber;
    activeClubber.committee = committee;
    this.setState({activeClubber: activeClubber});
  }

  getPosition = (position) => {
    let activeClubber = this.state.activeClubber;
    activeClubber.position = position;
    this.setState({activeClubber: activeClubber});
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
        window.location.reload();
      }
    })
  }

  componentWillMount() {
    this.setState({loadingAlert: true});
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      if(response.status === 200) {
        this.setState({clubbers: response.data, search: response.data, loadingAlert: false});
      }
    })
  }

  onChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let activeClubber = this.state.activeClubber;
    activeClubber[name] = value;
    this.setState({activeClubber: activeClubber});
  }

  search = (event) => {
    let query = event.target.value;
    this.setState({search_query: query});
    let filteredList = [];

    if(query === '') {
      this.setState({search: this.state.clubbers});
    }else {
      this.setState({search: this.state.clubbers.filter(item => {
        let last_name = item.last_name.toLowerCase();
        let first_name = item.first_name.toLowerCase();
        let middle_name = item.middle_name.toLowerCase();
        let nick_name = item.nick_name.toLowerCase();
        let student_number = item.student_number;
        query = query.toLowerCase();
        
        return (last_name.includes(query) || first_name.includes(query) || middle_name.includes(query) || student_number.includes(query) || nick_name.includes(query));
      })});
    }
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

  resetPassword = () => {
    this.setState({resetLoadingAlert: true});
    axios.put(`https://clubberdb-api.herokuapp.com/auth/${this.state.activeClubber.student_number}/`, {
      clubber: this.state.activeClubber.student_number,
      password: this.state.activeClubber.student_number
    }).then(response => {
      this.setState({resetLoadingAlert: false, resetSuccessAlert: true});
    })
  }

  dismissResetSuccessAlert = () => {
    this.setState({resetSuccessAlert: false});
  }

  sortList = (parameter) => {
    let newList = this.state.search.slice();
    switch(parameter) {
      case 'student_number':
        this.setState({search: newList.sort((a, b) => {
          return a.student_number - b.student_number;
        })});
        break;
      case 'last_name':
        this.setState({search: newList.sort((a,b) =>  {
          return a.last_name.localeCompare(b.last_name);
        })});
        break;
      case 'first_name':
        this.setState({search: newList.sort((a,b) =>  {
          return a.first_name.localeCompare(b.first_name);
        })});
        break;
    }
  }

  updateClubber = () => {
    axios.put(`https://clubberdb-api.herokuapp.com/clubbers/${this.state.activeClubber.student_number}/`, this.state.activeClubber)
    .then(response => {
      window.location.reload();
    });
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
              <Alert color='secondary' isOpen={this.state.resetLoadingAlert}>
                Resetting password ... 
              </Alert>
              <Alert color='success' isOpen={this.state.resetSuccessAlert} toggle={this.dismissResetSuccessAlert}>
                Password has been reset.
              </Alert>
              <Button color='danger' onClick={() => this.deleteClubber(this.state.activeClubber)}>Delete Clubber</Button>{' '}{this.state.editMode ? <Button color='secondary' onClick={this.toggleEditMode}>Cancel</Button> : <Button color='warning' onClick={this.toggleEditMode}>Edit Info</Button>}
              {' '}
              <Button color='warning' onClick={this.resetPassword}>Reset Password</Button>
              <br />
              <br />
              <Table>
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
                    <th>Birthday</th>
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
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <ButtonDropdown isOpen={this.state.committeeDropdown} toggle={this.toggleCommittee}>
                          <DropdownToggle caret color='info'>
                            {this.state.activeClubber.committee === 'TBA' ? 'Select Committee' : this.state.activeClubber.committee}
                          </DropdownToggle>
                          <DropdownMenu>
                            {COMMITTEES.map((item, i) => {
                              return(<DropdownItem onClick={() => this.getCommittee(item)}>{item}</DropdownItem>)
                            })}
                          </DropdownMenu>
                        </ButtonDropdown>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.committee}</td>
                    }
                  </tr>
                  <tr>
                    <th>Position</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <ButtonDropdown isOpen={this.state.positionsDropdown} toggle={this.togglePositions}>
                          <DropdownToggle caret color='info'>
                          {this.state.activeClubber.position === 'TBA' ? 'Select Position' : this.state.activeClubber.position}
                          </DropdownToggle>
                          <DropdownMenu>
                            {POSITIONS.map((item, i) => {
                              return(<DropdownItem onClick={() => this.getPosition(item)}>{item}</DropdownItem>)
                            })}
                          </DropdownMenu>
                        </ButtonDropdown>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.position}</td>
                    }
                  </tr>
                  <tr>
                    <th>Project</th>
                    {this.state.editMode ?
                    <td>
                      <FormGroup>
                        <Input type='text' name='project' onChange={this.onChange} value={this.state.activeClubber.project}/>
                      </FormGroup>
                    </td>
                    :
                    <td>{this.state.activeClubber.project}</td>}
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
              {this.state.editMode ? <Button color='success' onClick={this.updateClubber}>Update Info</Button> : ''}{' '}<Button color="primary" onClick={this.toggle}>Exit</Button>
            </ModalFooter>
          </Modal>
          {this.state.loadingAlert ? 
          <Alert color="light" isOpen={this.state.loadingAlert}>
            <p className='centered'>Loading data, please wait ... </p>
          </Alert>
          :
          <div>
            <h6>Total Registered: {this.state.clubbers.length}</h6>
            <FormGroup>
              <Input type='text' name='search_query' placeholder='Search Clubbers' onChange={this.search} value={this.state.search_query}/>
            </FormGroup>
            <Table striped hover responsive> 
              <thead>
                <tr>
                  <th><Button onClick={() => this.sortList('student_number')}>Student Number</Button></th>
                  <th><Button onClick={() => this.sortList('last_name')}>Last Name</Button></th>
                  <th><Button onClick={() => this.sortList('first_name')}>First Name</Button></th>
                  <th>Committee</th>
                  <th>Position</th>
                  <th>Project</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
              {this.state.search.map((item, i) => {
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
          </div>
          }
        </Container>
      </div>
    );
  }
};

export default ViewRegistered;
