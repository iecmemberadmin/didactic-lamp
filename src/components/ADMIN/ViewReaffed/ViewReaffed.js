import React, {Component} from 'react';
import axios from 'axios';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input} from 'reactstrap';

let CHOICES = [
  {real: true, display: 'Yes'},
  {real: false, display: 'No'}
]

class ViewReaffed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reaffed: [],
      selected: {},
      search: [],
      updateModal: false,
      dbDropdown: false,
      docsDropdown: false,
      feeDropdown: false,
      participationDropdown: false,
      jerseyDropdown: false,
      contractDropdown: false,
      search_query: ''
    };
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/reaff/')
    .then(response => {
      this.setState({reaffed: response.data, search: response.data});
    });
  }

  toggleUpdateModal = (selected) => {
    if(this.state.updateModal) {
      window.location.reload();
    }else {
      this.setState({updateModal: !this.state.updateModal, selected: selected});
    }
  }

  toggleDB = () => {
    this.setState({dbDropdown: !this.state.dbDropdown});
  }

  toggleDocs = () => {
    this.setState({docsDropdown: !this.state.docsDropdown});
  } 

  toggleFee = () => {
    this.setState({feeDropdown: !this.state.feeDropdown});
  }
  
  toggleParticipation = () => {
    this.setState({participationDropdown: !this.state.participationDropdown});
  }

  toggleJersey = () => {
    this.setState({jerseyDropdown: !this.state.jerseyDropdown});
  }

  getValue = (value, property) => {
    let selected = this.state.selected;
    selected[property] = value;
    this.setState({selected: selected});
  }

  confirmUpdate = () => {
    axios.put(`https://clubberdb-api.herokuapp.com/reaff/${this.state.selected.clubber}/`, this.state.selected)
    .then(response => {
      window.location.reload();
    });
  }

  search = (event) => {
    let query = event.target.value;
    this.setState({search_query: query});
    let filteredList = [];

    if(query === '') {
      this.setState({search: this.state.reaffed});
    }else {
      this.setState({search: this.state.reaffed.filter(item => {
        let last_name = item.last_name.toLowerCase();
        let student_number = item.clubber;
        query = query.toLowerCase();
        
        return (last_name.includes(query) || student_number.includes(query));
      })});
    }
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          <h3>Reaffed Clubbers</h3>
          <h6>Total Reaffed (Updated DB info and Read Contract): {this.state.reaffed.length}</h6>
          <FormGroup>
            <Input type='text' name='search_query' placeholder='Search Clubbers' onChange={this.search} value={this.state.search_query}/>
          </FormGroup>
          <Table>
            <thead>
              <tr>
                <th>Student Number</th>
                <th>Last Name</th>
                <th>Updated Database Info?</th>
                <th>Read Contract?</th>
                <th>Submitted Form 5 + ID?</th>
                <th>Paid Reaff Fee?</th>
                <th>Answered the EW Participation Survey?</th>
                <th>Answered the EW Jersey/Tickets Survey?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.search.map((item, i) => {
                return(
                  <tr>
                    <td>{item.clubber}</td>
                    <td>{item.last_name}</td>
                    <td>{item.updated_db ? 'Yes' : 'No'}</td>
                    <td>{item.read_contract ? 'Yes' : 'No'}</td>
                    <td>{item.submitted_docs ? 'Yes' : 'No'}</td>
                    <td>{item.paid_fee ? 'Yes' : 'No'}</td>
                    <td>{item.ew_participation ? 'Yes' : 'No'}</td>
                    <td>{item.ew_jersey ? 'Yes' : 'No'}</td>
                    <td><Button color='warning' onClick={() => this.toggleUpdateModal(item)}>Update</Button></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Modal isOpen={this.state.updateModal} toggle={this.toggleUpdateModal} size='lg'>
            <ModalHeader toggle={this.toggleUpdateModal}>Update Details</ModalHeader>
            <ModalBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Student Number</th>
                    <th>Last Name</th>
                    <th>Updated Database Info?</th>
                    <th>Read Contract?</th>
                    <th>Submitted Form 5 + ID?</th>
                    <th>Paid Reaff Fee?</th>
                    <th>Answered the EW Participation Survey?</th>
                    <th>Answered the EW Jersey/Tickets Survey?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.selected.clubber}</td>
                    <td>{this.state.selected.last_name}</td>
                    <td>
                      <ButtonDropdown isOpen={this.state.dbDropdown} toggle={this.toggleDB}>
                        <DropdownToggle caret color='warning'>
                          {this.state.selected.updated_db ? 'Yes' : 'No'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {CHOICES.map((item, i) => {
                            return(<DropdownItem onClick={() => this.getValue(item.real, 'updated_db')}>{item.display}</DropdownItem>)
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                    <td>
                      <ButtonDropdown isOpen={this.state.contractDropdown} toggle={this.toggleContract}>
                        <DropdownToggle caret color='warning'>
                          {this.state.selected.read_contract ? 'Yes' : 'No'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {CHOICES.map((item, i) => {
                            return(<DropdownItem onClick={() => this.getValue(item.real, 'read_contract')}>{item.display}</DropdownItem>)
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                    <td>
                      <ButtonDropdown isOpen={this.state.docsDropdown} toggle={this.toggleDocs}>
                        <DropdownToggle caret color='warning'>
                          {this.state.selected.submitted_docs ? 'Yes' : 'No'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {CHOICES.map((item, i) => {
                            return(<DropdownItem onClick={() => this.getValue(item.real, 'submitted_docs')}>{item.display}</DropdownItem>)
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                    <td>
                      <ButtonDropdown isOpen={this.state.feeDropdown} toggle={this.toggleFee}>
                        <DropdownToggle caret color='warning'>
                          {this.state.selected.paid_fee ? 'Yes' : 'No'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {CHOICES.map((item, i) => {
                            return(<DropdownItem onClick={() => this.getValue(item.real, 'paid_fee')}>{item.display}</DropdownItem>)
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                    <td>
                      <ButtonDropdown isOpen={this.state.participationDropdown} toggle={this.toggleParticipation}>
                        <DropdownToggle caret color='warning'>
                          {this.state.selected.ew_participation ? 'Yes' : 'No'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {CHOICES.map((item, i) => {
                            return(<DropdownItem onClick={() => this.getValue(item.real, 'ew_participation')}>{item.display}</DropdownItem>)
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                    <td>
                      <ButtonDropdown isOpen={this.state.jerseyDropdown} toggle={this.toggleJersey}>
                        <DropdownToggle caret color='warning'>
                          {this.state.selected.ew_jersey ? 'Yes' : 'No'}
                        </DropdownToggle>
                        <DropdownMenu>
                          {CHOICES.map((item, i) => {
                            return(<DropdownItem onClick={() => this.getValue(item.real, 'ew_jersey')}>{item.display}</DropdownItem>)
                          })}
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={() => this.toggleUpdateModal({})}>Cancel</Button>{' '}
              <Button color="success" onClick={this.confirmUpdate}>Confirm Updates</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default ViewReaffed;