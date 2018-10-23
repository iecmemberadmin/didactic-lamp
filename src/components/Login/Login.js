import React from 'react';
// eslint-disable-next-line
import { Card, CardText, CardBody, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import iec from '../../assets/Images/ieclub.png';

const Login = () => {
  return( 
    <div className='container'>
      <div className='centered'><h4 className='text-danger'><img alt='IECLUBLOGO' src={iec} height='5%' width='5%' /> Inside The Club</h4></div>
      <div>
        <Card id='login'>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="studNum">Student Number</Label>
                <Input type="text" name="studNum" id="studNum" placeholder="2015-12345" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" />
              </FormGroup>
              <div className='centered'><Button outline color='danger' href='/dashboard'>Login</Button></div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;