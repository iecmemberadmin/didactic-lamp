import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Alert} from 'reactstrap';
import axios from 'axios';

class ViewRegistered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubbers: [],
      search: [],
      detailsModal: false,
      activeClubber: {},
      editMode: false,
      search_query: '',
      tempEdit: {},
      loadingAlert: false
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
        let student_number = item.student_number;
        query = query.toLowerCase();
        
        return (last_name.includes(query) || first_name.includes(query) || middle_name.includes(query) || student_number.includes(query));
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

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Registered Clubbers</h3>
          <Modal isOpen={this.state.detailsModal} toggle={this.toggle} size='lg'>
            <ModalHeader toggle={this.toggle}><h4 style={{color: 'red'}}>Clubber Details: {this.state.activeClubber.nick_name} {this.state.activeClubber.last_name}</h4></ModalHeader>
            <ModalBody>
              <Button color='danger' onClick={() => this.deleteClubber(this.state.activeClubber)}>Delete Clubber</Button>{' '}{this.state.editMode ? <Button color='secondary' onClick={this.toggleEditMode}>Cancel</Button> : <Button color='warning' onClick={this.toggleEditMode}>Edit Info</Button>}
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
                    <td>{this.state.activeClubber.committee}</td>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <td>{this.state.activeClubber.position}</td>
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
              {this.state.editMode ? <Button color='success'>Update Info</Button> : ''}{' '}<Button color="primary" onClick={this.toggle}>Exit</Button>
            </ModalFooter>
          </Modal>
          {this.state.loadingAlert ? 
          <Alert color="light" isOpen={this.state.loadingAlert}>
            <p className='centered'>Loading data, please wait ... </p>
          </Alert>
          :
          <div>
            <FormGroup>
              <Input type='text' name='search_query' placeholder='Search Clubbers' onChange={this.search} value={this.state.search_query}/>
            </FormGroup>
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
