import React, {Component} from 'react';
import {Container, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import axios from 'axios';

class ViewQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      mode: '',
      modal: false,
      activeQuestion: {}
    }
  }

  componentWillMount() {
    axios.get('https://clubberdb-api.herokuapp.com/questions/all/')
    .then(response => {
      this.setState({questions: response.data});
    });
  }

  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  }

  addMode = () => {
    this.setState({modal: true, mode: 'add', activeQuestion: {question: '', description: ''}});
  }

  editMode = (question) => {
    this.setState({modal: true, mode: 'edit', activeQuestion: question})
  }

  onChange = (event) => {
    let data = this.state.activeQuestion;
    data[event.target.name] = event.target.value;
    this.setState({data: data});
  }

  submitQuestion = () => {
    if(this.state.mode === 'add') {
      axios.post('https://clubberdb-api.herokuapp.com/questions/all/', this.state.activeQuestion)
      .then(response => {
        window.location.reload();
      }).catch(error => {
        console.log(error.response.data);
      });
    }else if(this.state.mode === 'edit') {
      axios.put(`https://clubberdb-api.herokuapp.com/questions/detail/?question=${this.state.activeQuestion.question}`, this.state.activeQuestion)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
    }
  }

  deleteQuestion = (question) => {
    axios.delete(`https://clubberdb-api.herokuapp.com/questions/detail/?question=${question.question}`)
    .then(response => {
      window.location.reload();
    }).catch(error => {
      console.log(error.response.data);
    });
  }

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} size='lg'>
            <ModalHeader toggle={this.toggleModal}>{this.state.mode === 'add' ? 'Add':'Edit'} Question</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="question">Question</Label>
                  <Input type="text" name="question" id="question" value={this.state.activeQuestion.question} onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="description" value={this.state.activeQuestion.description} onChange={this.onChange}/>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.submitQuestion}>{this.state.mode === 'add' ? 'Submit Question' : 'Edit Question'}</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
          <h3>View Questions</h3>
          <Button color='warning' href='/admin/primer/view'>{'<'} Back to Primer</Button>{' '}
          <Button color='success' onClick={() => this.addMode()}>+ Add Question</Button>
          <br/>
          <br/>
          <ol>
            {this.state.questions.map(item => {
              return (
                <div>
                  <li>
                    <h5>{item.question} <Button color='warning' onClick={() => this.editMode(item)}><i class="fas fa-edit"/> Edit</Button>{' '}<Button color='danger' onClick={() => this.deleteQuestion(item)}><i class="fas fa-trash-alt"/> Delete</Button></h5>
                    <FormText color="muted">
                      {item.description}
                    </FormText>
                  </li>
                  <br/>
                </div>
              );
            })}
          </ol>
        </Container>
      </div>
    )
  }
}

export default ViewQuestions;