import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input, Alert, Spinner} from 'reactstrap';
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
    this.setState({loadingAlert: true});
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      if(response.status === 200) {
        this.setState({clubbers: response.data, search: response.data, loadingAlert: false});
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
    
    if(query === '') {
      this.setState({search: this.state.clubbers});
    }else {
      this.setState({search: this.state.clubbers.filter(item => {
        let last_name = item.last_name.toLowerCase();
        let first_name = item.first_name.toLowerCase();
        let middle_name = item.middle_name.toLowerCase();
        let nick_name = item.nick_name.toLowerCase();
        query = query.toLowerCase();
        
        return (last_name.includes(query) || first_name.includes(query) || middle_name.includes(query) || nick_name.includes(query));
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
              {this.state.activeClubber.degree_program}
              <br/>
              <br/>
              <i>{this.state.activeClubber.position} {this.state.activeClubber.project !== 'N/A' && '(' + this.state.activeClubber.project + ')'} <br/> {this.state.activeClubber.committee}</i> 
              <br/>
              <br/>
              {this.state.activeClubber.mobile_number}
              <br/>
              {this.state.activeClubber.email_address}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Exit</Button>
            </ModalFooter>
          </Modal>
          {this.state.loadingAlert ?
          <Alert color="light" isOpen={this.state.loadingAlert}>
            <p className='centered'><Spinner color='danger' type='grow'/>Loading data, please wait ... </p>
          </Alert>
          :
          <div>
            <FormGroup>
              <Input type='text' name='search_query' placeholder='Search Clubbers' onChange={this.search} value={this.state.search_query}/>
            </FormGroup>
            <Table striped hover responsive> 
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Nickname</th>
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
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.nick_name}</td>
                    <td>{item.committee}</td>
                    <td>{item.position}</td>
                    <td>{item.project}</td>
                    <td><Button color='success' onClick={() => this.toggleDetailsModal(item)}>Details</Button></td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
          </div>}
        </Container>
      </div>
    );
  }
}

export default Directory;