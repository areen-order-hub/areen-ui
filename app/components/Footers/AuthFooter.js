import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function AuthFooter() {
  return (
    <>
      <footer className="py-0 py-md-4" id="footer-main">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-secondary">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1 text-secondary"
                  href="/"
                  target="_blank"
                >
                  Areen Order Hub
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink className="text-secondary" href="/" target="_blank">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="text-secondary"
                    href="/auth/terms"
                    target="_blank"
                  >
                    Terms & Conditions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="text-secondary"
                    href="/auth/privacy"
                    target="_blank"
                  >
                    Privacy Policy
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;
