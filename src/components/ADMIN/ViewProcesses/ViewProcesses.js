import React, {Component} from 'react';
import axios from 'axios';
import {Container, Button, Table} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class ViewProcesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      showButton: false,
      isApplicationsActive: false
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/proc/reaff/')
    .then(response => {
      let value = response.data.active;
      if(value) {
        this.setState({isActive: value});
      }
    });
    axios.get('https://clubberdb-api.herokuapp.com/proc/officer_applications/')
    .then(response => {
      let value = response.data.active;
      if(value) {
        this.setState({isApplicationsActive: value});
      }
      this.setState({showButton: true});
    });
  }

  changeReaffState = () => {
    if(this.state.isActive) {
      axios.put('https://clubberdb-api.herokuapp.com/proc/reaff/', {
        'name': 'reaff',
        'active': false
      }).then(response => {
        this.setState({isActive: false});
      });
    }else {
      axios.put('https://clubberdb-api.herokuapp.com/proc/reaff/', {
        'name': 'reaff',
        'active': true
      }).then(response => {
        this.setState({isActive: true});
      });
    }
  }

  changeOfficerApplicationsState = () => {
    if(this.state.isApplicationsActive) {
      axios.put('https://clubberdb-api.herokuapp.com/proc/officer_applications/', {
        'name': 'officer_applications',
        'active': false
      }).then(response => {
        this.setState({isApplicationsActive: false});
      });
    }else {
      axios.put('https://clubberdb-api.herokuapp.com/proc/officer_applications/', {
        'name': 'officer_applications',
        'active': true
      }).then(response => {
        this.setState({isApplicationsActive: true});
      });
    }
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Processes</h3>
          <Table responsive borderless>
            <thead>
              <tr>
                <th>Process Name</th>
                <th>Toggle Button</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reaff</td>
                <td>{this.state.showButton && <Button color={this.state.isActive ? 'danger' : 'success'} onClick={this.changeReaffState}>{this.state.isActive ? 'Close Reaff' : 'Activate Reaff'}</Button>}</td>
              </tr>
              <tr>
                <td>Officer Applications (Clubber Primer)</td>
                <td>{this.state.showButton && <Button color={this.state.isApplicationsActive ? 'danger' : 'success'} onClick={this.changeOfficerApplicationsState}>{this.state.isApplicationsActive ? 'Close Applications' : 'Activate Applications'}</Button>}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
};

export default ViewProcesses;