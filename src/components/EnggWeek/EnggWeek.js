import React, {Component} from 'react';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import axios from 'axios';
import NavMenu from '../NavMenu/NavMenu';

class EnggWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          <h3>EWOC 30</h3>
          <Row>
            <Col>
              <Jumbotron>
                <h1 className='display-3 centered'>1000</h1>
                <p className='lead centered'>Organization Points</p>
              </Jumbotron>
            </Col>
            <Col>
            <Jumbotron>
                <h1 className='display-3 centered'>1000</h1>
                <p className='lead centered'>Your Points</p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default EnggWeek;