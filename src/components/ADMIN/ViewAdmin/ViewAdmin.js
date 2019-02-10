import React, {Component} from 'react';
import axios from 'axios';
import {Container, Table} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class ViewAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: []
    };
  }
  
  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/adminauth/')
    .then(response => {
      this.setState({admins: response.data});
    })
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Admin Credentials</h3>
          <Table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {this.state.admins.map((item, i) => {
                return (
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default ViewAdmin;