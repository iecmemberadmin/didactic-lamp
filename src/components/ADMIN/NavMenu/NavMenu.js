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
                  Engg Week
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
                  <DropdownItem divider />
                  <DropdownItem href='/admin/add/clubber'>
                    Add New Clubber
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href='/admin/processes'>View Processes</NavLink>
              </NavItem>
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