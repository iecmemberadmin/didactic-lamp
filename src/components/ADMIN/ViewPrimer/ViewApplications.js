import React, {Component} from 'react';
import {Container, Table, Button} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import axios from 'axios';

class ViewApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      activeClubber: {}
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

  render() {
    return(
      <div> 
        <NavMenu />
        <Container>
          <h3>View Applications</h3>
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
                    <td><Button color='success' onClick={() => this.approveApplication(item)}>Approve</Button>{' '}<Button color='danger' onClick={()=> this.deleteApplication(item)}>Delete</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default ViewApplications;