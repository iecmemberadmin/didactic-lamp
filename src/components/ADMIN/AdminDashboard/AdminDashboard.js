import React, {Component} from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Container, Toast, ToastHeader, ToastBody, Row, Col} from 'reactstrap';

class AdminDashboard extends Component {
  render() {
    return(
      <div>
        <NavMenu />
        <Container>
          <h3>Welcome, Admin.</h3>
          <Row>
            <Col>
              <Toast>
                <ToastHeader icon="warning">
                  Announcements
                </ToastHeader>
                <ToastBody>
                <Toast>
                  <ToastHeader icon="danger">
                    Mem Admin Team
                  </ToastHeader>
                  <ToastBody>
                    New features as of:<br/>
                    <ul>
                      <li>June 3, 2019</li>
                      <ul>
                        <li>Integrated application form for role applications</li>
                        <li>Export to CSV function in Registered Clubbers module</li>
                      </ul>
                    </ul>
                  </ToastBody>
                </Toast>
                </ToastBody>
              </Toast>
            </Col>
            <Col>
            
            </Col>
            <Col>
              <Toast>
                <ToastHeader icon="warning">
                  Upcoming features
                </ToastHeader>
                <ToastBody>
                  <Toast>
                    <ToastHeader icon="success">
                      User Side
                    </ToastHeader>
                    <ToastBody>
                      <ul>
                        <li>Mem Evals Module</li>
                        <li>CRS</li>
                      </ul>
                    </ToastBody>
                  </Toast>
                  <Toast>
                    <ToastHeader icon="info">
                      Admin Side
                    </ToastHeader>
                    <ToastBody>
                      <ul>
                        <li>View Mem Evals</li>
                      </ul>
                    </ToastBody>
                  </Toast>
                </ToastBody>
              </Toast>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default AdminDashboard;