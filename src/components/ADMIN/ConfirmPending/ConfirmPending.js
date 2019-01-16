import React, {Component} from 'react';
import axios from 'axios';
import {Container, Table, Button} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class ConfirmPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: []
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/pending/')
    .then(response => {
      this.setState({pending: response.data});
    })
  }

  confirm = (clubber) => {
    let student_number = clubber.student_number;
    axios.post('https://clubberdb-api.herokuapp.com/clubbers/', {
      student_number: clubber.student_number,
      first_name: clubber.first_name,
      middle_name: clubber.middle_name,
      last_name: clubber.last_name,
      nick_name: clubber.nick_name,
      committee: clubber.committee,
      position: clubber.position,
      project: clubber.project,
      birthday: clubber.birthday,
      degree_program: clubber.degree_program,
      mobile_number: clubber.mobile_number,
      email_address: clubber.email_address,
      present_address: clubber.present_address,
      permanent_address: clubber.permanent_address,
      emergency_name: clubber.emergency_name,
      emergency_relationship: clubber.emergency_relationship,
      emergency_contact: clubber.emergency_contact,
      carpool_capacity: clubber.carpool_capacity,
      av_equipment: clubber.av_equipment,
      sports_equipment: clubber.sports_equipment,
      instruments: clubber.instruments,
      current_subjects: clubber.current_subjects,
      closest_friends: clubber.closest_friends,
      ieaid_company: clubber.ieaid_company,
      ieaid_contactperson: clubber.ieaid_contactperson,
      ieaid_contactdetails: clubber.ieaid_contactdetails,
      candy: clubber.candy
    }).then(response => {
      axios.post('https://clubberdb-api.herokuapp.com/auth/', {
        clubber: clubber.student_number,
        password: clubber.password
      }).then(response => {
        axios.delete(`https://clubberdb-api.herokuapp.com/pending/${clubber.student_number}/`)
        .then(response => {
          this.setState({
            pending: this.state.pending.filter(item => {
              return item.student_number !== student_number;
            })
          })
        })
      })
    })
  }

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          <h3>Pending Signup Requests</h3>
          <Table>
            <thead>
              <tr>
                <th>Student Number</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Degree Program</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.pending.map((item, i) => {
                return(
                  <tr>
                    <td>{item.student_number}</td>
                    <td>{item.first_name}</td>
                    <td>{item.middle_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.degree_program}</td>
                    <td><Button color='success' onClick={() => this.confirm(item)}>Confirm</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
};

export default ConfirmPending;