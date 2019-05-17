import React, {Component} from 'react';
import {Container} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import axios from 'axios';

let forEvals = {
  'President': ['Executive Secretary', 'Vice President'],
  'Executive Secretary': ['President', 'Associate Secretary'],
  'Vice President': ['President', 'Associate Secretary', 'Director', 'Project Manager'],
  'Associate Director': ['Executive Secretary', 'Vice President', 'Director', 'Project Manager'],
  'Director': ['Vice President', 'Associate Secretary', 'Project Manager'],
  'Project Manager': ['Vice President', 'Associate Secretary', 'Director', 'Member'],
  'Member': ['Project Manager'],
  '': []
}

class MemEval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: ''
    }
  }

  componentWillMount() {
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`)
    .then(response => {
      this.setState({position: response.data.position});
    })
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Member Evaluations</h3>
          <h6>Kindly send an evaluation for the following:</h6>
          <ul>{forEvals[this.state.position].map(item => {
            return(
              <li>{item}</li>
            )
          })}</ul>
        </Container>
      </div>
    )
  }
} 

export default MemEval;