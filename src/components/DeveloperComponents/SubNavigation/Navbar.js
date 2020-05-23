import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Clock from "react-live-clock";

class DevNavigation extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationWrapper>
          <Navbar expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand>
                  <Clock format={"dddd, MMMM D, YYYY, h:mm:ss A"} />
                </Navbar.Brand>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </NavigationWrapper>
      </React.Fragment>
    );
  }
}

export default DevNavigation;

const NavigationWrapper = styled.div`
  nav {
    margin-bottom: 30px;
  }
`;
