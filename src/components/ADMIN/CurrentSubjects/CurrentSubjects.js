import React, {Component} from 'react';
import axios from 'axios';
import {Container, Table, Button, Modal, ModalBody, ModalHeader, FormGroup, Input, Label, Alert} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class CurrentSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubbers: [],
      editModal: false,
      activeClubber: {},
      loadingAlert: false,
      successInfoAlert: false
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      this.setState({clubbers: response.data});
    })
  }

  onChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    let activeClubber = this.state.activeClubber;
    activeClubber[name] = value;
    this.setState({activeClubber: activeClubber});
  }

  setActiveClubber = (clubber) => {
    this.setState({activeClubber: clubber, editModal: true});
  }

  updateSubjects = () => {
    this.setState({loadingAlert: true});
    axios.put(`https://clubberdb-api.herokuapp.com/clubbers/${this.state.activeClubber.student_number}/`, this.state.activeClubber)
    .then(response => {
      this.setState({loadingAlert: false, successInfoAlert: true, editModal: false});
    })
  }

  dismissSuccessInfoAlert = () => {
    this.setState({successInfoAlert: false});
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Academic Welfare: Subjects Database</h3>
          <Modal isOpen={this.state.editModal} toggle={() => window.location.reload()} size='lg'>
            <ModalHeader toggle={() => window.location.reload()}>{this.state.activeClubber.nick_name} {this.state.activeClubber.last_name}</ModalHeader>
            <ModalBody>
              <Alert color="secondary" isOpen={this.state.loadingAlert}>
                Updating subjects, please wait ...
              </Alert>
              <FormGroup>
                <Label>Current Subjects</Label>
                <Input type='text' name='current_subjects' onChange={this.onChange} value={this.state.activeClubber.current_subjects}/>
              </FormGroup>
              <Button color='success' onClick={this.updateSubjects}>Confirm</Button>{' '}<Button color='warning' onClick={() => window.location.reload()}>Cancel</Button>
            </ModalBody>
          </Modal>
          <Alert color="success" isOpen={this.state.successInfoAlert} toggle={this.dismissSuccessInfoAlert}>
            Successfully updated database.
          </Alert>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Student Number</th>
                <th>Current Subjects</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.clubbers.map((item, i) => {
                return(
                  <tr>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.student_number}</td>
                    <td>{item.current_subjects}</td>
                    <td><Button color='warning' onClick={() => this.setActiveClubber(item)}>Edit</Button></td>
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

export default CurrentSubjects;