import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import iec from '../../../assets/Images/ieclub.png';

class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="danger" dark expand="md">
          <NavbarBrand href="/admin">{/*<img alt='IECLUBLOGO' src={iec} height='10%' width='10%'/>*/} Inside The Club Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Announcements
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/admin/view/announcement'>
                    View All Announcements
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href='/admin/add/announcement'>
                    Add Announcement
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Academics
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/admin/acad/subjects'>
                    Subjects Database
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Internals
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/admin/view/events">
                    Event Attendance
                  </DropdownItem>
                  <DropdownItem href="/admin/view/birthdays">
                    Birthdays
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Clubbers
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/admin/view/registered'>
                    View All Registered Clubbers
                  </DropdownItem>
                  <DropdownItem href='/admin/view/reaffed'>
                    View All Reaffed Clubbers
                  </DropdownItem>
                  <DropdownItem href='/admin/view/pending'>
                    Pending Signup Requests
                  </DropdownItem>
                  <DropdownItem href='/admin/resourceaccess'>
                    Resource Access
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href='/admin/add/clubber'>
                    Add New Clubber
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href='/admin/processes'>
                    Manage Processes
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href='/admin/add/credentials'>
                    Add Admin Credentials
                  </DropdownItem>
                  <DropdownItem href='/admin/view/credentials'>
                    View Admin Credentials
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export default NavMenu;