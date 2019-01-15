import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, FormGroup, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import axios from 'axios';

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubbers: [],
      search: [],
      detailsModal: false,
      activeClubber: {},
      search_query: ''
    };
  }

  toggleDetailsModal = (clubber) => {
    this.setState({detailsModal: true, activeClubber: clubber})
  } 

  toggle = () => {
    this.setState({detailsModal: false});
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      if(response.status === 200) {
        this.setState({clubbers: response.data, search: response.data});
        console.log(response.data);
      }
    });
  }

  onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});
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

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3 className='centered' style={{color: 'red'}}>Directory</h3>
          <Modal isOpen={this.state.detailsModal} toggle={this.toggle} size='lg'>
            <ModalHeader toggle={this.toggle}><h4 style={{color: 'red'}}>Clubber Details: {this.state.activeClubber.nick_name} {this.state.activeClubber.last_name}</h4></ModalHeader>
            <ModalBody>
              <h4>{this.state.activeClubber.first_name} {this.state.activeClubber.last_name}</h4>
              {this.state.activeClubber.student_number} <br/> {this.state.activeClubber.degree_program}
              <br/>
              <br/>
              <i>{this.state.activeClubber.position} {this.state.activeClubber.project !== 'N/A' && '(' + this.state.activeClubber.project + ')'} <br/> {this.state.activeClubber.committee}</i> 
              <br/>
              <br/>
              {this.state.activeClubber.mobile_number}
              <br/>
              {this.state.activeClubber.email_address}
              <br/>
              {this.state.activeClubber.present_address}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Exit</Button>
            </ModalFooter>
          </Modal>
          <FormGroup>
            <InputGroup>
              <Input type='text' name='search_query' placeholder='Search Clubbers' onChange={this.search} value={this.state.search_query}/>
            </InputGroup>
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
                <tr>
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
        </Container>
      </div>
    );
  }
}

export default Directory;