import React, {Component} from 'react';
//import axios from 'axios';
import {Container, Input, InputGroupAddon, InputGroupText, InputGroup, Button, Row, Col} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

//let CLUSTERS = ['III-IE', 'IV-IE', 'V-IE', 'ES Subjects', 'MaPhyChem', 'Other Engg', 'BA/Econ', 'GE/Electives', 'Other Fields', 'Physical Book Library', 'Opportunities', 'Software', 'Useful Links'];

class Rainbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      search_query: ''
    }
  }

  setActiveTab = (tab) => {
    this.setState({activeTab: tab});
  }

  search = (event) => {
    this.setState({search_query: event.target.value});
  }

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          <h3>Rainbox</h3>
          <Row>
            <Col xs='5'>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i class="fas fa-search"></i></InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='search_query' placeholder='Search subjects...' onChange={this.search} value={this.state.search_query}/>
              </InputGroup>
            </Col>
            <Col xs='5'>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                  <InputGroupText><i class="fas fa-search"></i></InputGroupText>
                </InputGroupAddon> */}
                <Input type='text' name='search_query' placeholder='Search type' onChange={this.search} value={this.state.search_query}/>
              </InputGroup>
            </Col>
            <Col>
              <Button color='danger'>Search</Button>  
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Rainbox;