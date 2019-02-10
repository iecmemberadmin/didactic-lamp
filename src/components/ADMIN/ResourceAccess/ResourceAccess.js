import React, {Component} from 'react';
import axios from 'axios';
import {Container, Table} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class ResourceAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubbers: []
    };
  }
  
  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      this.setState({clubbers: response.data});
    })
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h5>Resource Access</h5>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clubbers.map((item, i) => {
                return (
                  <tr>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.email_address}</td>
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

export default ResourceAccess;