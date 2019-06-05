import React, {Component} from 'react';
import axios from 'axios';
import {Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Spinner} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';

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

let ICONS = {
  "Academics": "fas fa-book",
  "Externals": "fas fa-hand-holding-heart",
  "Extracurricular": "fas fa-running",
  "Finance": "fas fa-money-bill-wave",
  "Internals": "fas fa-home",
  "Membership": "fas fa-user-friends",
  "Publicity": "fas fa-palette",
  "Matrix Project": "fas fa-project-diagram",
}

class ClubberPrimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      userApplications: [],
      positions: [],
      filteredPositions: [],
      activePosition: {
        committee: '',
        level: '',
        project: '',
        number_of_people: 1,
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
      detailsModal: false,
      selectedCommittee: 'All Committees',
      selectedLevel: 'All Levels',
      loadingAlert: false,
      activeApplications: false
    }
  }

  componentWillMount() {
    this.setState({loadingAlert: true});
    axios.get('https://clubberdb-api.herokuapp.com/positions/all/')
    .then(response => {
      this.setState({positions: response.data, filteredPositions: response.data, loadingAlert: false});
    });
    axios.get('https://clubberdb-api.herokuapp.com/proc/officer_applications/')
    .then(response => {
      let value = response.data.active;
      if(value) {
        this.setState({activeApplications: value});
      }
    });
    axios.get(`https://clubberdb-api.herokuapp.com/clubbers/${localStorage.getItem('student_number')}/`)
    .then(response => {
      this.setState({userDetails: response.data});
    });
    axios.get(`https://clubberdb-api.herokuapp.com/applications/user/?student_number=${localStorage.getItem('student_number')}`)
    .then(response => {
      this.setState({userApplications: response.data});
    });
  }

  toggleCommitteeDropdown = () => {
    this.setState({committeeDropdown: !this.state.committeeDropdown});
  }

  toggleLevelDropdown = () => {
    this.setState({levelDropdown: !this.state.levelDropdown});
  }

  toggleDetailsModal = () => {
    this.setState({detailsModal: !this.state.detailsModal});
  }

  setActivePosition = (position) => {
    this.setState({activePosition: position, detailsModal: true});
  }

  selectCommittee = (committee) => {
    let filteredPositions = [];
    this.setState({selectedCommittee: committee});
    switch(committee) {
      case 'All Committees':
        switch(this.state.selectedLevel) {
          case 'All Levels':
            filteredPositions = this.state.positions;
            break;
          default: 
            filteredPositions = this.state.positions.filter(item => {
              return item.level === this.state.selectedLevel;
            });
            break;
        }
        break;
      default:
        switch(this.state.selectedLevel) {
          case 'All Levels':
            filteredPositions = this.state.positions.filter(item => {
              return item.committee === committee;
            });
            break;
          default: 
            filteredPositions = this.state.positions.filter(item => {
              return item.committee === committee && item.level === this.state.selectedLevel;
            });
            break;
        }
        break;
    }
    this.setState({filteredPositions: filteredPositions});
  }

  selectLevel = (level) => {
    let filteredPositions = [];
    this.setState({selectedLevel: level});
    switch(level) {
      case 'All Levels':
        switch(this.state.selectedCommittee) {
          case 'All Committees':
            filteredPositions = this.state.positions;
            break;
          default: 
            filteredPositions = this.state.positions.filter(item => {
              return item.committee === this.state.selectedCommittee;
            });
            break;
        }
        break;
      default:
        switch(this.state.selectedCommittee) {
          case 'All Committees':
            filteredPositions = this.state.positions.filter(item => {
              return item.level === level;
            });
            break;
          default: 
            filteredPositions = this.state.positions.filter(item => {
              return item.committee === this.state.selectedCommittee && item.level === level;
            });
            break;
        }
        break;
    }
    this.setState({filteredPositions: filteredPositions});
  }

  sendApplication = (position) => { 
    console.log(position);
    axios.post('https://clubberdb-api.herokuapp.com/applications/all/', {
      committee: position.committee,
      level: position.level,
      project: position.project,
      name: this.state.userDetails.first_name + ' ' + this.state.userDetails.last_name,
      student_number: this.state.userDetails.student_number
    }).then(response => {
      window.location.reload();
    })
  }

  checkIfApplied = (position) => {
    for(let i = 0; i < this.state.userApplications.length; i++) {
      let item = this.state.userApplications[i];
      if(item.committee === position.committee && item.level === position.level && item.project === position.project) {
        return true;
      }
      console.log(item);
    }
    return false;
  }

  answerApplication = (position) => {    
    localStorage.setItem('position', JSON.stringify(position));
    localStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));
    this.props.history.push('/primer/apply');
    /*setTimeout(() => {
      
    }, 1000);*/
  }

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          <h3>Role Applications</h3>
          <h5>Clubber Primer</h5>
          <Modal size='lg' isOpen={this.state.detailsModal} toggle={this.toggleDetailsModal}>
            <ModalHeader toggle={this.toggleDetailsModal}>{this.state.activePosition.committee}: {this.state.activePosition.level} - {this.state.activePosition.project}</ModalHeader>
            <ModalBody  style={{overflow: 'hidden'}}>
              <p><b>Number of People: </b>{this.state.activePosition.number_of_people}</p>
              <p><b>Job Description: </b>
              <ol>
              {this.state.activePosition.job_description.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Objectives: </b>
              <ol>
              {this.state.activePosition.objectives.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Timeline: </b>
              <ol>
              {this.state.activePosition.timeline.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Important Skills: </b>
              <ol>
              {this.state.activePosition.important_skills.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Challenges Faced: </b>
              <ol>
              {this.state.activePosition.challenges_faced.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Opportunities: </b>
              <ol>
              {this.state.activePosition.opportunities.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Resources: </b>
              <ol>
              {this.state.activePosition.resources.map(item=>{
                return(
                  <li><div><a href={item} target='_blank' rel='noopener noreferrer'>{item}</a></div></li>
                )
              })}
              </ol>
              </p>
              <p><b>Document Resources: </b>
              <ol>
              {this.state.activePosition.document_resources.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
              <p><b>Role History: </b>
              <ol>
              {this.state.activePosition.role_history.map(item=>{
                return(
                  <li>{item}</li>
                )
              })}
              </ol>
              </p>
            </ModalBody>
            <ModalFooter>
            {this.state.activeApplications ? this.checkIfApplied(this.state.activePosition) ? <Button color='secondary' disabled>Submitted</Button> : <Button color='success' onClick={() => this.answerApplication(this.state.activePosition)}>Apply</Button> : null}{' '}
              <Button color="secondary" onClick={this.toggleDetailsModal}>Back</Button>
            </ModalFooter>
          </Modal>
          {this.state.loadingAlert ?
          <Alert color="light" isOpen={this.state.loadingAlert}>
            <p className='centered'><Spinner color='danger' type='grow'/>Loading data, please wait ... </p>
          </Alert>
          :
          <div>
            <ButtonDropdown isOpen={this.state.committeeDropdown} toggle={this.toggleCommitteeDropdown}>
              <DropdownToggle caret color='danger'>
                {this.state.selectedCommittee}
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
                {this.state.selectedLevel}
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
            <Table>
              <thead>
                <tr>
                  <th>Committee</th>
                  <th>Level</th>
                  <th>Project</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredPositions.map(item => {
                  return(
                    <tr>
                      <td><i class={ICONS[item.committee]}></i> {item.committee}</td>
                      <td>{item.level}</td>
                      <td>{item.project}</td>
                      <td><Button color='warning' onClick={() => this.setActivePosition(item)}>Read More</Button>{' '}{this.state.activeApplications ? this.checkIfApplied(item) ? <Button color='secondary' disabled>Submitted</Button> : <Button color='success' onClick={() => this.answerApplication(item)}>Apply</Button> : null}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
          }
        </Container>
      </div>
    );
  }
}

export default ClubberPrimer;