import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table} from 'reactstrap';
import axios from 'axios';

class ClubberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClubber: {}
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
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          <h3 className='centered' style={{color: 'red'}}>Clubber Profile</h3>
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
        </Container>      
      </div>
    );
  }
};

export default ClubberProfile;