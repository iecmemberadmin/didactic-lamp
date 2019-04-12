import React, {Component} from 'react';
import axios from 'axios';
import {Container, Jumbotron, Button, Row, Col, FormGroup, Input, Table, Alert} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import moment from 'moment';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedAlert: false,
      loadingAlert: false,
      successAlert: false,
      duplicateAlert: false,
      noneAlert: false,
      activeEvent: '',
      search_query: '',
      attendees: [],
      recentlyAdded: ''
    }
  }

  componentWillMount() {
    axios.get(`https://clubberdb-api.herokuapp.com/events/detail?name=${localStorage.getItem('eventName')}`)
    .then(response => {
      this.setState({activeEvent: response.data});
    });
    axios.get(`https://clubberdb-api.herokuapp.com/attendance/?event=${localStorage.getItem('eventName')}`)
    .then(response => {
      this.setState({attendees: response.data});
    });
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  addClubber = () => {
    this.setState({loadingAlert: true, successAlert: false, noneAlert: false, duplicateAlert: false});
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${this.state.search_query}/`)
    .then(response => {
      let clubber = response.data;

      axios.post(`https://clubberdb-api.herokuapp.com/attendance/`, {
        event: localStorage.getItem('eventName'),
        clubber: clubber.student_number,
        name: clubber.last_name + ', ' + clubber.first_name 
      }).then(response => {
        axios.get(`https://clubberdb-api.herokuapp.com/attendance/?event=${localStorage.getItem('eventName')}`)
        .then(response => {
          this.setState({attendees: response.data, recentlyAdded: clubber.student_number + ' (' + clubber.last_name + ', ' + clubber.first_name + ')', successAlert: true, loadingAlert: false});
        });
      }).catch(error => {
        if(error.response.status === 400) {
          this.setState({loadingAlert: false, duplicateAlert: true});
        }
      });
    }).catch(error => {
      if(error.response.status === 404) {
        this.setState({loadingAlert: false, noneAlert: true});
      }
    });
  }

  dismissSuccessAlert = () => {
    this.setState({successAlert: false});
  }

  dismissDuplicateAlert = () => {
    this.setState({duplicateAlert: false});
  }

  dismissNoneAlert = () => {
    this.setState({noneAlert: false});
  }

  dismissDeletedAlert = () => {
    this.setState({deletedAlert: false});
  }

  deleteAttendance = (student_number, name) => {
    this.setState({loadingAlert: true, successAlert: false, duplicateAlert: false, noneAlert: false, deletedAlert: false});
    axios.delete(`https://clubberdb-api.herokuapp.com/attendance/detail/?event=${localStorage.getItem('eventName')}&clubber=${student_number}`)
    .then(response => {
      axios.get(`https://clubberdb-api.herokuapp.com/attendance/?event=${localStorage.getItem('eventName')}`)
        .then(response => {
          this.setState({attendees: response.data, recentlyAdded: student_number + ' (' + name + ')', loadingAlert: false, deletedAlert: true});
        });
    });
  }

  handleKeyPress = (event) => {
    switch(event.key) {
      case 'Enter':
        this.addClubber();
        break;
      default:
        break;
    }
  }

  deleteEvent = () => {
    axios.delete(`https://clubberdb-api.herokuapp.com/events/detail/?name=${localStorage.getItem('eventName')}`)
    .then(response => {
      localStorage.removeItem('eventName');
      this.props.history.push('/admin/view/events');
    }).catch(error => {
      console.log(error.response.data);
    });
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <Button href='/admin/view/events' color='secondary'>{'<'} Back to Events Page</Button>{' '}<Button color='danger' onClick={this.deleteEvent}>Delete Event</Button>
          <br />
          <br />
          <Jumbotron>
            <h1 className='display-3 centered'>{this.state.activeEvent.name}</h1>
            <p className='lead centered'>{moment(this.state.activeEvent.date).format('MMMM DD, YYYY h:mm a')}, {this.state.activeEvent.location}</p>
          </Jumbotron>
          <Alert isOpen={this.state.loadingAlert} color='secondary'>
            Loading, please wait ...
          </Alert>
          <Alert isOpen={this.state.successAlert} color='success' toggle={this.dismissSuccessAlert}>
            Success! {this.state.recentlyAdded} has been added to list of attendees.
          </Alert>
          <Alert isOpen={this.state.duplicateAlert} color='danger' toggle={this.dismissDuplicateAlert}>
            Clubber is already in the list of attendees.
          </Alert>
          <Alert isOpen={this.state.noneAlert} color='danger' toggle={this.dismissNoneAlert}>
            Clubber not found.
          </Alert>
          <Alert isOpen={this.state.deletedAlert} color='warning' toggle={this.dismissDeletedAlert}>
            {this.state.recentlyAdded} has been removed from list of attendees.
          </Alert>
          <Row>
            <Col>
              <FormGroup>
                <Input type='text' name='search_query' placeholder='201XXXXXX' onChange={this.onChange} value={this.state.search_query} onKeyPress={this.handleKeyPress}/>
              </FormGroup>
            </Col>
            <Col xs='auto'>
              <Button color='danger' onClick={this.addClubber}>Add Clubber</Button>
            </Col>
          </Row>
          <h4>Attendees</h4>
          <Table>
            <thead>
              <tr>
                <th>Student Number</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.attendees.map((item, i) => {
                return(
                  <tr>
                    <td>{item.clubber}</td>
                    <td>{item.name}</td>
                    <td><Button onClick={() => this.deleteAttendance(item.clubber, item.name)} close/></td>
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

export default Attendance;