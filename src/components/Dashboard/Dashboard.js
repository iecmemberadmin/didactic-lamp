import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container} from 'reactstrap';

const Dashboard = () => {
  return(
    <div>
      <NavMenu />
      <Container>
        <h3>Dashboard</h3>
      </Container>
    </div>
  );
};

export default Dashboard;