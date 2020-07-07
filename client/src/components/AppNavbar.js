import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <Fragment>
        <NavItem>
          <Logout/>
        </NavItem>

        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{ user && `Welcome ${user.name}`}</strong>
          </span>
        </NavItem>
      </Fragment>
    )
    const guestLinks = (
      <Fragment>

        <NavItem>
          <RegisterModal />
        </NavItem>

        <NavItem>
          <LoginModal />
        </NavItem>

        <span className="navbar-text mr-3">
            <strong>{ !user && `Welcome Guest`}</strong>
        </span>

      </Fragment>
    )

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shopping-List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#">
                    Total Items : {this.props.items.length}
                  </NavLink>
                </NavItem>
                { isAuthenticated ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.item.items,
    auth: state.auth
  };
};
export default connect(mapStateToProps)(AppNavbar);
