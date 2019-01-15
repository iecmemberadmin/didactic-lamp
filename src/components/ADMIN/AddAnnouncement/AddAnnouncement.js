import React, {Component} from 'react';
import {Container} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

class AddAnnouncement extends Component {
  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Add New Announcement</h3>
        </Container>
      </div>
    );
  }
}

export default AddAnnouncement;