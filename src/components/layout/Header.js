import React, { Component } from 'react'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

class Header extends Component {


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
      <div id='App-header'>
        <div className='container'>
          <Navbar color="faded" light expand="md">
            <Link to={'/'} className={'navbar-brand'}>База сортов яблок</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to={'/'} className="nav-link">Главная</Link>
                </NavItem>
                <NavItem>
                  <Link to={'/list'} className="nav-link">Список</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    )
  }
}

export default Header;
