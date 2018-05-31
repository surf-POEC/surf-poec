import React, { Component } from 'react';
import './App.css';
import {
  Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav,NavItem, NavLink,
  UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem ,
  Container, Row, Col 
} from 'reactstrap';

import Candhis from './candhis/Candhis';
import Vague from './vague/Vague';
import Maree from './maree/Maree';

class App extends Component {
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
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Forecast Surf</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Compoment</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

      <Container fluid={true}>
        <Row className="p-4">
          <Col md="4"><Vague/></Col>
          <Col md="4"><Candhis/></Col>
          <Col md="4"><Maree/></Col>
        </Row>
      </Container>
       <footer id="windguru">
            <iframe className="windguruiframe" src="http://www.windguru.cz/int/distr_iframe.php?u=1264320&s=48561&c=83245d9e44" width="100%"></iframe>
      </footer>
        
      </div>
    );
  }
}



export default App;
