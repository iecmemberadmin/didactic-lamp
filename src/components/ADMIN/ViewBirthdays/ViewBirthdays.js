import React, {Component} from 'react';
import axios from 'axios';
import {Container, Table} from 'reactstrap';
import NavMenu from '../NavMenu/NavMenu';
import moment from 'moment';

class ViewBirthdays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      birthdays: [],
      clubbers: []
    }
  }

  componentWillMount() {
    for(let i = 0; i < 12; i++) {
      let birthdays = this.state.birthdays;
      birthdays.push([]);
      this.setState({birthdays: birthdays});
    }
    axios.get('https://clubberdb-api.herokuapp.com/clubbers/')
    .then(response => {
      this.setState({clubbers: response.data});
      response.data.map((item, i) => {
        let month = moment(item.birthday).month();
        let data = {
          birthday: item.birthday,
          name: item.first_name + ' (' + item.nick_name + ') ' + item.last_name 
        };
        let birthdays = this.state.birthdays;
        birthdays[month].push(data);
        this.setState({birthdays: birthdays});
      });
    });
  }

  render() {
    return(
      <div>
        <NavMenu/>
        <Container>
          <h3>Birthdays</h3>
          <Table responsive>
            {this.state.birthdays.map((item, i) => {
              return(
                <span>
                  <thead>
                    <tr><h5>{this.state.monthNames[i]}</h5></tr>
                  </thead>
                  <tbody>
                    {item.map((object, i) => {
                      return(
                        <tr>
                          <td>{object.name}</td>
                          <td>{object.birthday}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <br/>
                </span>
              )
            })}
          </Table>
        </Container>
      </div>
    )
  }
};

export default ViewBirthdays;