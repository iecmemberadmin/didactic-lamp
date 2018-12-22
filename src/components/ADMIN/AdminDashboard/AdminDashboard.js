import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container} from 'reactstrap';

class AdminDashboard extends Component {
  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Admin Dashboard</h3>
        </Container>
      </div>
    );
  }
};

export default AdminDashboard;