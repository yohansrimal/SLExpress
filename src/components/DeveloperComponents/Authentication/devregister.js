import React from "react";
import { MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { Col } from "react-bootstrap";
import Input from "../common/input";
import Joi from "joi-browser";
import Form from "../common/form";
import { register } from "../../../DeveloperServices/userService";
import styled from "styled-components";
import Swal from "sweetalert2";

class Register extends Form {
  state = {
    data: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      type: "developer",
    },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()

      .label("Username"),
    firstname: Joi.string().required().min(2).label("First Name"),
    lastname: Joi.string().required().min(2).label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .label("Contact Number")
      .options({
        language: {
          string: {
            regex: {
              base: "is invalid & should be 10 numbers",
            },
          },
        },
      }),
    type: Joi.required(),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration successful.",
          footer: "Please confirm your email before login.",
          showConfirmButton: true,
        }).then(function () {
          window.location.reload();
        });
      }
    } catch (ex) {
      const errors = { ...this.state.errors };
      if (ex.response) {
        if (ex.response.status === 422) {
          const exdata = ex.response.data.errors;
          exdata.forEach((info) => {
            const parameter = info.param;
            const message = info.msg;

            if (parameter === "username") {
              errors.username = message;
            }
            if (parameter === "email") {
              errors.email = message;
            }
            this.setState({ errors });
          });
        }
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeaderWrapper>
          <MDBAnimation type="fadeInRight">
            <div
              className="register"
              style={{
                width: "40vw",
              }}
            >
              <Col>
                <form onSubmit={this.handleSubmit}>
                  <p className="h2 text-center mb-4 text-color-ash">Signup</p>
                  <div className="grey-text">
                    <MDBRow>
                      <MDBCol>
                        <Input
                          name="firstname"
                          value={data.firstname}
                          label="First Name:"
                          type="text"
                          onChange={this.handleChange}
                          error={errors.firstname}
                        />
                      </MDBCol>
                      <MDBCol>
                        <Input
                          name="lastname"
                          value={data.lastname}
                          label="Last Name:"
                          type="text"
                          onChange={this.handleChange}
                          error={errors.lastname}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <Input
                          name="username"
                          value={data.username}
                          label="Username:"
                          type="text"
                          onChange={this.handleChange}
                          error={errors.username}
                        />
                      </MDBCol>

                      <MDBCol>
                        <Input
                          name="email"
                          value={data.email}
                          label="Email:"
                          type="text"
                          onChange={this.handleChange}
                          error={errors.email}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol>
                        <Input
                          name="password"
                          value={data.password}
                          label="Password:"
                          type="password"
                          onChange={this.handleChange}
                          error={errors.password}
                        />
                      </MDBCol>
                      <MDBCol>
                        <Input
                          name="phone"
                          value={data.phone}
                          type="text"
                          label="Contact No: "
                          onChange={this.handleChange}
                          error={errors.phone}
                        />
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary">Sign Up</button>
                  </div>
                </form>
              </Col>
            </div>
          </MDBAnimation>
        </HeaderWrapper>
      </div>
    );
  }
}

export default Register;

const HeaderWrapper = styled.div`
  .register {
    margin: 10vh;
    margin-bottom: 2vh;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    padding: 15px;
    border-radius: 10px;
  }
`;
