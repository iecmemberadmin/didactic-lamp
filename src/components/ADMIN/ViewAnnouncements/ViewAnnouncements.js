import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Media} from 'reactstrap';
import axios from 'axios';
import NavMenu from '../NavMenu/NavMenu';

class ViewAnnouncements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/announcements/')
    .then(response => {
      if(response.status === 200) {
        this.setState({announcements: response.data});
      }
    });
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Announcements</h3>
          <ListGroup>
            {this.state.announcements.map((item, i) => {
              return(
                <ListGroupItem>
                  <Media>
                    <Media body>
                      <Media heading>
                        {item.title}
                      </Media>
                      {item.body}
                    </Media>
                  </Media>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Container>
      </div>
    );
  }
}

export default ViewAnnouncements;