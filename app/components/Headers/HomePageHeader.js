import React from "react";
import classnames from "classnames";
import { useCookies } from "react-cookie";

import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";
import _get from 'lodash/get';
import history from "utils/history";

const getName = (cookie) => _get(cookie, 'user.name', 'User');

function Header({ sidenavOpen, toggleSidenav,profilePicture }) {
  const [cookie] = useCookies(['user']);

  const redirectToProfile = (e) => {
    e.preventDefault();
    history.push('/profile');
  }

  return (
    <>
    <Navbar className="navbar-top navbar-expand border-bottom">
      <Container fluid>
        <Collapse navbar isOpen={true}>
          <Nav className="text-left my-1 pl-2" navbar>
            <NavItem className="d-xl-none">
              <div className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    "sidenav-toggler-dark"
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-right ml-auto" navbar>
            
              <span className="py-2 mx-3 text-primary font-weight-bold">{getName(cookie)}</span>
              {profilePicture ? 
                <a
                  className="avatar avatar-sm rounded-circle"
                  href="#pablo"
                  onClick={redirectToProfile}
                >
                  <img alt="..." src={profilePicture} />
                </a>
              : <i className="ni ni-circle-08 text-primary hover-pointer text-xl pt-2" onClick={redirectToProfile} />}

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;