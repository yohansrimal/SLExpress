import React from "react";
import { MDBAnimation } from "mdbreact";
import { Col } from "react-bootstrap";
import Input from "../common/input";
import Joi from "joi-browser";
import Form from "../common/form";
import styled from "styled-components";
import loginService from "../../../DeveloperServices/loginService";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

class Login extends Form {
  state = {
    data: {
      lemail: "",
      lpassword: "",
      ltype: "developer",
    },
    errors: {},
  };

  schema = {
    lemail: Joi.string().required().email().label("Email"),
    lpassword: Joi.string().required().label("Password"),
    ltype: Joi.string().required(),
  };

  doSubmit = async () => {
    Swal.queue([
      {
        title: "Logging in",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      },
    ]);

    try {
      const { data } = this.state;
      await loginService.login(data);
      Swal.fire({
        icon: "success",
        title: "Login Successfull",
        showConfirmButton: false,
        timer: 1500,
      }).then(function () {
        window.location = "/dashboard";
      });
    } catch (ex) {
      const errors = { ...this.state.errors };
      if (ex.response) {
        if (ex.response.status === 422) {
          Swal.close();
          errors.lpassword = "Invalid Email or Password";
          this.setState({ errors });
        }
        if (ex.response.status === 403) {
          Swal.close();
          errors.lpassword = "Email not confirmed.";
          this.setState({ errors });
        }
      }
    }
  };

  render() {
    const { data, errors } = this.state;

    return (
      <MDBAnimation type="fadeInLeft">
        <div
          className="login "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeaderWrapper>
            <div
              className="login"
              style={{
                width: "20vw",
              }}
            >
              <Col>
                <form onSubmit={this.handleSubmit}>
                  <p className="h2 text-center mb-4 text-color-ash">Login</p>
                  <div className="grey-text">
                    <Input
                      name="lemail"
                      value={data.lemail}
                      label="Email:"
                      onChange={this.handleChange}
                      error={errors.lemail}
                    />
                    <Input
                      name="lpassword"
                      value={data.lpassword}
                      label="Password:"
                      type="password"
                      onChange={this.handleChange}
                      error={errors.lpassword}
                    />
                  </div>
                  Forget Password?
                  <div className="text-center logbutton">
                    <button className="btn btn-primary">Login</button>
                  </div>
                </form>
              </Col>
            </div>
          </HeaderWrapper>
        </div>
      </MDBAnimation>
    );
  }
}

export default Login;

const HeaderWrapper = styled.div`
  .login {
    margin: 10vh;
    margin-bottom: 2vh;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    padding: 15px;
    border-radius: 10px;
  }

  .logbutton {
    margin-top: 2vh;
  }
`;
