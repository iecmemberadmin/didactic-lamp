import React, {Component} from 'react';
import {Container, Button, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledCollapse, Alert, Spinner} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import axios from 'axios';

let COMMITTEES = [
  'Academics', 
  'Externals', 
  'Extracurricular', 
  'Finance', 
  'Internals', 
  'Membership', 
  'Publicity',
  'Matrix Project',
  'All Committees'
]

let LEVELS = [
  'Associate',
  'Director',
  'Project Manager',
  'Project Head',
  'Member',
  'All Levels'
]

class AddPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        committee: '',
        level: '',
        project: '',
        number_of_people: 0,
        job_description: [],
        objectives: [],
        timeline: [],
        important_skills: [],
        challenges_faced: [],
        opportunities: [],
        role_history: [],
        document_resources: [],
        resources: []
      },
      committeeDropdown: false,
      levelDropdown: false,
      job_description: '',
      objectives: '',
      timeline: '',
      important_skills: '',
      challenges_faced: '',
      opportunities: '',
      role_history: '',
      document_resources: '',
      resources: '',
      loadingAlert: false,
      alreadyExistsAlert: false,
      successAlert: false
    }
  }

  toggleCommitteeDropdown = () => {
    this.setState({committeeDropdown: !this.state.committeeDropdown});
  }

  toggleLevelDropdown = () => {
    this.setState({levelDropdown: !this.state.levelDropdown});
  }

  selectCommittee = (committee) => {
    let data = this.state.data;
    data.committee = committee;
    this.setState({data: data});
  }

  selectLevel = (level) => {
    let data = this.state.data;
    data.level = level;
    this.setState({data: data});
  }

  onChange = (event) => {
    let data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({data: data});
  } 

  addData = (field) => {
    let value = this.state[field];
    let data = this.state.data;
    let list = this.state.data[field];
    list.push(value);
    data[field] = list;
    this.setState({data: data, [field]: ''});
  }

  dataChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  submit = () => {
    this.setState({loadingAlert: true, successAlert: false, alreadyExistsAlert: false});
    axios.get(`https://clubberdb-api.herokuapp.com/positions/detail/?committee=${this.state.data.committee}&level=${this.state.data.level}&project=${this.state.data.project}`)
    .then(response => {
      this.setState({loadingAlert: false, alreadyExistsAlert: true});
    })
    .catch(error => {
      axios.post('https://clubberdb-api.herokuapp.com/positions/all/', this.state.data)
      .then(response => {
        this.setState({successAlert: true, loadingAlert: false, data: {
          committee: '',
          level: '',
          project: '',
          number_of_people: 0,
          job_description: [],
          objectives: [],
          timeline: [],
          important_skills: [],
          challenges_faced: [],
          opportunities: [],
          role_history: [],
          document_resources: [],
          resources: []
        }})
      })
      .catch(error=>{
        console.log(error.response.data);
      })
    });
  }

  dismissAlert = (alert) => {
    this.setState({[alert]: false});
  }

  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Add New Position</h3>
          <Button color='warning' href='/admin/primer/view'>{'<'} Go back to Primer</Button>{' '}<Button color='info' id='toggler'>Show/Hide Summary</Button>
          {(this.state.loadingAlert || this.state.alreadyExistsAlert || this.state.successAlert) && <div><br/></div>}
          <Alert color="light" isOpen={this.state.loadingAlert} className='centered'>
            <Spinner color='danger' type='grow'/>Submitting data, please wait ...
          </Alert>
          <Alert color="danger" isOpen={this.state.alreadyExistsAlert} className='centered' toggle={() => this.dismissAlert('alreadyExistsAlert')}>
            Position already exists.
          </Alert>
          <Alert color="success" isOpen={this.state.successAlert} className='centered' toggle={() => this.dismissAlert('successAlert')}>
            Successfully added position.
          </Alert>
          <hr/>
          <h5>Summary of Data</h5>
          <UncontrolledCollapse toggler='#toggler'>
          <Row>
            <Col>
              <p><b>Committee: </b>{this.state.data.committee}</p>
              <p><b>Level: </b>{this.state.data.level}</p>
              <p><b>Project: </b>{this.state.data.project}</p>
              <p><b>Number of People: </b>{this.state.data.number_of_people}</p>
              <p><b>Job Description: </b>
              <ol>
              {this.state.data.job_description.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Objectives: </b>
              <ol>
              {this.state.data.objectives.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Timeline: </b>
              <ol>
              {this.state.data.timeline.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
            </Col>
            <Col>
            <p><b>Important Skills: </b>
              <ol>
              {this.state.data.important_skills.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Challenges Faced: </b>
              <ol>
              {this.state.data.challenges_faced.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Opportunities: </b>
              <ol>
              {this.state.data.opportunities.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Resources: </b>
              <ol>
              {this.state.data.resources.map(item=>{
                return(
                  <li><div><a href={item} target='_blank' rel='noopener noreferrer'>{item}</a></div></li>
                )
              })}
              </ol>
              </p>
              <p><b>Document Resources: </b>
              <ol>
              {this.state.data.document_resources.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Role History: </b>
              <ol>
              {this.state.data.role_history.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
            </Col>
          </Row>
          <Button color='success' onClick={this.submit}>Add Position</Button>
          </UncontrolledCollapse>
          <hr/>
          <Row>
            <Col>
              <h5>Edit Data</h5>
              <ButtonDropdown isOpen={this.state.committeeDropdown} toggle={this.toggleCommitteeDropdown}>
                <DropdownToggle caret color='danger'>
                  {this.state.data.committee === '' ? 'Select Committee' : this.state.data.committee}
                </DropdownToggle>
                <DropdownMenu>
                {COMMITTEES.map(item => {
                    return(
                      <DropdownItem onClick={() => this.selectCommittee(item)}>{item}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </ButtonDropdown>{' '}
              <ButtonDropdown isOpen={this.state.levelDropdown} toggle={this.toggleLevelDropdown}>
                <DropdownToggle caret color='danger'>
                  {this.state.data.level === '' ? 'Select Level' : this.state.data.level}
                </DropdownToggle>
                <DropdownMenu>
                  {LEVELS.map(item => {
                    return(
                      <DropdownItem onClick={() => this.selectLevel(item)}>{item}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </ButtonDropdown>
              <br/>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Project</InputGroupText>
                    </InputGroupAddon>
                    <Input name='project' onChange={this.onChange}/>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Number of People</InputGroupText>
                    </InputGroupAddon>
                    <Input name='number_of_people' min={0} max={100} type="number" step="1" onChange={this.onChange}/>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <p><i>For the following data, click the ... </i></p>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Job Description</InputGroupText>
                    </InputGroupAddon>
                    <Input name='job_description' type='textarea' value={this.state.job_description} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('job_description')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Objectives</InputGroupText>
                    </InputGroupAddon>
                    <Input name='objectives' type='textarea' value={this.state.objectives} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('objectives')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Timeline</InputGroupText>
                    </InputGroupAddon>
                    <Input name='timeline' type='textarea' value={this.state.timeline} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('timeline')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Important Skills</InputGroupText>
                    </InputGroupAddon>
                    <Input name='important_skills' type='textarea' value={this.state.important_skills} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('important_skills')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Challenges Faced</InputGroupText>
                    </InputGroupAddon>
                    <Input name='challenges_faced' type='textarea' value={this.state.challenges_faced} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('challenges_faced')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Opportunities</InputGroupText>
                    </InputGroupAddon>
                    <Input name='opportunities' type='textarea' value={this.state.opportunities} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('opportunities')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Resources</InputGroupText>
                    </InputGroupAddon>
                    <Input name='resources' type='textarea' value={this.state.resources} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('resources')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Document Resources</InputGroupText>
                    </InputGroupAddon>
                    <Input name='document_resources' type='textarea' value={this.state.document_resources} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('document_resources')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Role History</InputGroupText>
                    </InputGroupAddon>
                    <Input name='role_history' type='textarea' value={this.state.role_history} onChange={this.dataChange}/>
                    <InputGroupAddon addonType="append">
                      <Button color='success' onClick={() => {this.addData('role_history')}}>Add Data</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
          
      </div>
    )
  }
}

export default AddPosition;