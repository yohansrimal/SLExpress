import React, { Component } from "react";
import styled from "styled-components";
import Register from "../../components/DeveloperComponents/Authentication/devregister";
import DevLogin from "../../components/DeveloperComponents/Authentication/devlogin";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    value: false,
  };

  changeComponent = (props) => {
    if (props.value) {
      return <Register />;
    }
    return <DevLogin />;
  };

  handleClick = () => {
    if (this.state.value === "true") {
      this.setState({
        value: !this.state.value,
      });
    } else {
      this.setState({
        value: !this.state.value,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <this.changeComponent value={this.state.value} />
        <ButtonWrapper>
          <div className="subdiv">
            {this.state.value ? (
              <Button onClick={this.handleClick} variant="outlined">
                Already a member? Log In
              </Button>
            ) : (
              <Button onClick={this.handleClick} variant="outlined">
                Don't have an account? Sign Up
              </Button>
            )}
          </div>
        </ButtonWrapper>
      </React.Fragment>
    );
  }
}

export default Login;

const ButtonWrapper = styled.div`
  .subdiv {
    text-align: center;
  }
  .submitButton {
    border: none;
    outline: none;
    background-color: none;
    margin-bottom: 10vh;
  }
`;
