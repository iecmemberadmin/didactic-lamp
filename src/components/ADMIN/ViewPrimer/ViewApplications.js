import React, {Component} from 'react';
import {Container, Table, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import axios from 'axios';

class ViewApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      activeClubber: {answers: {}},
      modal: false
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/applications/all/')
    .then(response => {
      this.setState({applications: response.data});
    });
  }

  deleteApplication = (application) => {
    axios.delete(`https://clubberdb-api.herokuapp.com/applications/detail/?committee=${application.committee}&level=${application.level}&project=${application.project}&student_number=${application.student_number}`)
    .then(response => {
      window.location.reload();
    });
  }

  approveApplication = (application) => {
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${application.student_number}/`)
    .then(response => {
      let data = response.data;
      data.committee = application.committee;
      data.position = application.level;
      data.project = application.project;
      axios.put(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`, data)
      .then(response => {
      });
    });
    this.deleteApplication(application);
  }

  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  }

  viewApplication = (position) => {
    this.setState({modal: true, activeClubber: position});
  }

  render() {
    return(
      <div> 
        <NavMenu />
        <Container>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} size='lg'>
            <ModalHeader toggle={this.toggleModal}><b>{this.state.activeClubber.name}</b><br/> <i>({this.state.activeClubber.committee} - {this.state.activeClubber.level} - {this.state.activeClubber.project})</i></ModalHeader>
            <ModalBody>
              <ol>
              {this.state.activeClubber.answers !== {} ? Object.keys(this.state.activeClubber.answers).map(item => {
                if(item !== 'Officer Role Project' && item !== 'Comments/Questions/Suggestions/Free Space') {
                  return(
                    <li>
                      {item} <br/>
                      <i>{this.state.activeClubber.answers[item]}</i>
                    </li>
                  )
                } 
              }) : null}
              </ol>
              Comments/Questions/Suggestions/Free Space <br/>
              <i>{this.state.activeClubber.answers['Comments/Questions/Suggestions/Free Space']}</i>
            </ModalBody>
            <ModalFooter>
              <Button color='success' onClick={() => this.approveApplication(this.state.activeClubber)}>Approve</Button>{' '}
              <Button color='danger' onClick={()=> this.deleteApplication(this.state.activeClubber)}>Delete</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
          <h3>View Applications</h3>
          <Button color='warning' href='/admin/primer/view'>{'<'} Back to Primer</Button>
          <br/>
          <br/>
          {this.state.applications.length > 0 ?
          <Table>
            <thead>
              <tr>
                <th>Committee</th>
                <th>Level</th>
                <th>Project</th>
                <th>Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {this.state.applications.map(item => {
                return(
                  <tr>
                    <td>{item.committee}</td>
                    <td>{item.level}</td>
                    <td>{item.project}</td>
                    <td>{item.name}</td>
                    {/* <td><Button color='success' onClick={() => this.approveApplication(item)}>Approve</Button>{' '}<Button color='danger' onClick={()=> this.deleteApplication(item)}>Delete</Button></td> */}
                    <td><Button color='warning' onClick={() => this.viewApplication(item)}><i class="fas fa-eye"></i> View Application Form</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          :
          <Alert color='light'>
            <p className='centered'>No current applications available.</p>
          </Alert>
          }
        </Container>
      </div>
    )
  }
}

export default ViewApplications;