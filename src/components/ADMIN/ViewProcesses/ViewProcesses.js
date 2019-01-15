import React, {Component} from 'react';
import axios from 'axios';
import {Container, Button, Table} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class ViewProcesses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      showButton: false
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/proc/reaff/')
    .then(response => {
      let value = response.data.active;
      if(value) {
        this.setState({isActive: value});
      }
      this.setState({showButton: true});
    })
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
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
};

export default ViewProcesses;