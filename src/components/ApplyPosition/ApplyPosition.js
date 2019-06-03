import React, {Component} from 'react';
import {Container, Button, FormGroup, Form, FormText, Label, Input} from 'reactstrap';
import axios from 'axios';
import NavMenu from '../NavMenu/NavMenu';

class ApplyPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: JSON.parse(localStorage.getItem('position')),
      questions: [],
      userDetails: JSON.parse(localStorage.getItem('userDetails')),
      answers: {}
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/questions/all/')
    .then(response => {
      this.setState({questions: response.data}, () => {
        let answers = {}
        for(let i = 0; i < this.state.questions.length; i++) {
          answers[this.state.questions[i].question] = '';
          if(i === this.state.questions.length - 1) {
            this.setState({answers: answers});
          }
        }
      });
    });
  }

  onChange = (event) => {
    let data = this.state.answers;
    data[event.target.name] = event.target.value;
    this.setState({data: data});
  }

  submitApplication = () => {
    axios.post('https://clubberdb-api.herokuapp.com/applications/all/', {
      committee: this.state.position.committee,
      level: this.state.position.level,
      project: this.state.position.project,
      name: this.state.userDetails.first_name + ' ' + this.state.userDetails.last_name,
      student_number: this.state.userDetails.student_number,
      answers: this.state.answers
    }).then(response => {
      this.props.history.push('/primer');
    })
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Submit Application</h3>
          <Button color='warning' href='/primer'>{'<'} Back to Primer</Button>
          <br/>
          <br/>
          <Form>
            <h5>Name</h5>
            <h7>{this.state.userDetails.first_name + ' ' + this.state.userDetails.last_name}</h7>
            <br/>
            <br/>
            <h5>Position Applied For</h5>
            <h7>{this.state.position.committee + ' - ' + this.state.position.level + ' - ' + this.state.position.project}</h7>
            <br/>
            <br/>
            <FormText color='danger'>All items below are required. Write 'N/A' if not applicable.</FormText>
            <br/>
            {this.state.questions.map(item => {
              if(item.question !== 'Officer Role Project') {
                return(
                  <FormGroup>
                    <Label for={item.question}><h5>{item.question}<span style={{color: 'red'}}>*</span></h5></Label>
                    <Input type="textarea" name={item.question} id={item.question} value={this.state.answers[item.question]} onChange={this.onChange}/>
                    <FormText>{item.description}</FormText>
                  </FormGroup>
                )
              } 
            })}
            {/* <FormGroup>
              <Label for="question">Question</Label>
              <Input type="text" name="question" id="question" value={this.state.activeQuestion.question} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" value={this.state.activeQuestion.description} onChange={this.onChange}/>
            </FormGroup> */}
          </Form>
          <Button color='success' onClick={() => this.submitApplication()}>Submit Application</Button>
        </Container>
      </div>
    )
  }
}

export default ApplyPosition;