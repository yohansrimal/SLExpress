import React, { Component } from "react";
import loginService from "../../DeveloperServices/loginService";

class Logout extends Component {
  componentDidMount() {
    loginService.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
