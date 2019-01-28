import React, {Component} from 'react';
import axios from 'axios';
import {Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import moment from 'moment';

let MONTHS = [
  'January',
  'February',
  'March', 
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let DAYS = [];

let AMPM = [
  'am',
  'pm'
]


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthDropdown: false,
      dayDropdown: false,
      timeDropdown: false,
      events: [],
      eventModal: false,
      month: '',
      day: '', 
      time: '',
      ampm: 'am'
    };
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/events/')
    .then(response => {
      this.setState({events: response.data});
    });
    for(let i = 1; i < 32; i++) {
      if(i < 10) {
        DAYS.push('0' + i.toString());
      }else {
        DAYS.push(i.toString());
      }
    }
  }

  viewDetails = (eventName) => {
    localStorage.setItem('eventName', eventName);
    this.props.history.push('/admin/view/events/attendance');
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
  }

  toggleEventModal = () => {
    this.setState({eventModal: !this.state.eventModal});
  }

  getItem = (data, type) => {
    switch(type) {
      case 'month':
        this.setState({month: data, index: (MONTHS.indexOf(data) + 1)});
        break;
      case 'day':
        this.setState({day: data});
        break;
      case 'time':
        this.setState({ampm: data});
    }
  }

  toggleDropdown = (type) => {
    switch(type) {
      case 'month':
        this.setState({monthDropdown: !this.state.monthDropdown});
        break;
      case 'day':
        this.setState({dayDropdown: !this.state.dayDropdown});
        break;
      case 'time':
        this.setState({timeDropdown: !this.state.timeDropdown});
        break;
    }
  }

  addEvent = () => {
    axios.post('https://clubberdb-api.herokuapp.com/events/', {
      name: this.state.event,
      date: this.state.year+'-'+(this.state.index < 9 ? '0' + this.state.index.toString() : this.state.index.toString())+'-'+this.state.day+'T'+moment(this.state.time + ' ' + this.state.ampm, 'h:mm a').format('HH:MM')+'+08:00',
      location: this.state.location
    }).then(response => {
      console.log(response);
      console.log(this.state.time + ' ' + this.state.ampm);
      console.log(moment(this.state.time + ' ' + this.state.ampm, 'h:mm a').format('HH:mm'));
      console.log(this.state.year+'-'+(this.state.index < 9 ? '0' + this.state.index.toString() : this.state.index.toString())+'-'+this.state.day+'T'+this.state.time+'+08:00');
    }).catch(error => {
      console.log(this.state);
      console.log(error.response.data);
      console.log(this.state.year+'-'+(this.state.index < 9 ? '0' + this.state.index.toString() : this.state.index.toString())+'-'+this.state.day+'T'+this.state.time+'+08:00');
    });
    
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          <Modal isOpen={this.state.eventModal} toggle={this.toggleEventModal} size='lg'>
            <ModalHeader toggle={this.toggleEventModal}>Add Event</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Event Name</Label>
                <Input type='text' name='event' onChange={this.onChange} value={this.state.name}/>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <br/>
                <Row>
                  <Col xs='auto'>
                    <ButtonDropdown isOpen={this.state.monthDropdown} toggle={() => this.toggleDropdown('month')}>
                      <DropdownToggle caret color='danger'>
                      {this.state.month === '' ? 'Month' : this.state.month}
                      </DropdownToggle>
                      <DropdownMenu>
                        {MONTHS.map((item, i) => {
                          return(<DropdownItem onClick={() => this.getItem(item, 'month')}>{item}</DropdownItem>)
                        })}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                  <Col xs='auto'>
                    <ButtonDropdown isOpen={this.state.dayDropdown} toggle={() => this.toggleDropdown('day')}>
                      <DropdownToggle caret color='danger'>
                      {this.state.day === '' ? 'Day' : this.state.day}
                      </DropdownToggle>
                      <DropdownMenu>
                        {DAYS.map((item, i) => {
                          return(<DropdownItem onClick={() => this.getItem(item, 'day')}>{item}</DropdownItem>)
                        })}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                  <Col>
                    <Input type='text' name='year' placeholder='Year' onChange={this.onChange} value={this.state.year}/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Time</Label>
                <br/>
                <Row>
                  <Col xs='auto'>
                    <Input type='text' name='time' placeholder='6:00' onChange={this.onChange} value={this.state.time}/>
                  </Col>
                  <Col xs>
                    <ButtonDropdown isOpen={this.state.timeDropdown} toggle={() => this.toggleDropdown('time')}>
                      <DropdownToggle caret color='danger'>
                      {this.state.ampm}
                      </DropdownToggle>
                      <DropdownMenu>
                        {AMPM.map((item, i) => {
                          return(<DropdownItem onClick={() => this.getItem(item, 'time')}>{item}</DropdownItem>)
                        })}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input type='text' name='location' onChange={this.onChange} value={this.state.location}/>
              </FormGroup>
              <Button color='success' onClick={this.addEvent}>Confirm</Button>
            </ModalBody>
          </Modal>
          <h3>Events</h3>
          <Button color='success' onClick={this.toggleEventModal}>+ Add New Event</Button>
          <br/>
          <br/>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.events.map((item, i) => {
                return(
                  <tr>
                    <td>{item.name}</td>
                    <td>{moment(item.date).format('MMMM DD YYYY, h:mm:ss a')}</td>
                    <td>{item.location}</td>
                    <td><Button color='warning' onClick={() => this.viewDetails(item.name)}>View Details</Button></td>
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

export default Events;