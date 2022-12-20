/**
 *
 * RtNavBar
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { useCookies } from "react-cookie";
import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import _get from "lodash/get";
import history from "utils/history";
import reducer from "./reducer";
import moment from "moment-timezone";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./rtNavBarStyle.scss";

export default function RtNavBar({
  sidenavOpen,
  toggleSidenav,
  profilePicture,
  logo,
}) {
  useInjectReducer({ key: "rtNavBar", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);

  return (
    <>
      <Navbar className="navbar-top navbar-expand border-bottom">
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="text-left my-1 pl-2" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
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
            {/* <img
              alt={logo.imgAlt}
              className="navbar-brand-img ml-md-5"
              src={logo.imgSrc}
              height="20px"
            /> */}
            <Nav className="align-items-right ml-auto" navbar>
              {/* <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link my-1" color="" tag="a">
                  <i className="ni ni-bell-55" />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-xl py-0 overflow-hidden"
                  right
                >
                  <div className="px-3 py-3 d-flex justify-content-between">
                    <h6 className="text-sm text-muted m-0">
                      You have{" "}
                      <strong className="text-info">
                        {unreadNotifications}
                      </strong>{" "}
                      {unreadNotifications == 0 || unreadNotifications == 1
                        ? "new notification."
                        : "new notifications."}
                    </h6>
                    <h6
                      className="text-sm text-muted text-right m-0 hover-pointer text-underline"
                      onClick={(e) => history.push("/notifications")}
                    >
                      View All
                    </h6>
                  </div>
                  <ListGroup flush>{getNotifications()}</ListGroup>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  className="nav-link d-flex align-items-center hover-pointer"
                  color=""
                  tag="a"
                >
                  <span className="mx-2 text-primary font-weight-bold">
                    {selectors.getName(cookie)}
                  </span>
                  {profilePicture ? (
                    <a
                      className="avatar avatar-sm rounded-circle"
                      href="#pablo"
                    >
                      <img alt="..." src={profilePicture} />
                    </a>
                  ) : (
                    <i className="ni ni-circle-08 text-primary text-xl pb-1" />
                  )}
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-sm text-sm py-0 overflow-hidden"
                  right
                >
                  <ListGroup flush>
                    <ListGroupItem
                      className="px-2 py-2 hover-pointer"
                      onClick={() =>
                        history.push({
                          pathname: `/profile/${selectors.getId(cookie)}`,
                          state: { id: selectors.getId(cookie) },
                        })
                      }
                    >
                      Profile
                    </ListGroupItem>
                    <ListGroupItem
                      className="px-2 py-2 hover-pointer"
                      onClick={() => history.push("/auth/resetpassword")}
                    >
                      Change Password
                    </ListGroupItem>
                    <ListGroupItem
                      className="px-2 py-2 hover-pointer"
                      onClick={() => history.push("/logout")}
                    >
                      Logout
                    </ListGroupItem>
                  </ListGroup>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

RtNavBar.propTypes = {};
