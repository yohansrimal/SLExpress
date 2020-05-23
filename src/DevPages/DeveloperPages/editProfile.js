import React from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import { Card } from "react-bootstrap";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";

import { update, retrieveData } from "../../DeveloperServices/userService";
import Swal from "sweetalert2";

import { MDBCol, MDBAnimation } from "mdbreact";

import Input from "../../components/DeveloperComponents/common/input";
import Joi from "joi-browser";
import Form from "../../components/DeveloperComponents/common/form";

export default class myProfile extends Form {
  state = {
    loading: true,
    data: {},
    errors: {},
    phonenumber: "",
  };

  schema = {
    username: Joi.string().required().label("Username"),
    firstName: Joi.string().required().min(2).label("First Name"),
    lastName: Joi.string().required().min(2).label("Last Name"),
    email: Joi.string().required().email().label("Email"),
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
    confirmed: Joi.required(),
  };

  async componentDidMount() {
    try {
      const response = await retrieveData();
      this.setData(response);
    } catch (ex) {}
  }

  setData = (response) => {
    this.setState({
      loading: false,
      data: response.data,
    });
  };

  doSubmit = async () => {
    try {
      const response = await update(this.state.data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Update successful.",
          showConfirmButton: true,
        }).then(function () {
          window.location = "/myprofile";
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
      <React.Fragment>
        <SubNavigation />
        <div className="container-fluid">
          <Grid>
            <Grid.Column width={3}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              {this.state.loading ? (
                <div>
                  {""}
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </div>
              ) : (
                <MDBAnimation type="fadeIn">
                  <Card>
                    <Card.Header align="center" as="h3">
                      Update Profile Details{" "}
                    </Card.Header>
                    <Card.Body>
                      <div className="updateProfile">
                        <form onSubmit={this.handleSubmit}>
                          <div className="grey-text">
                            <MDBCol>
                              <MDBCol>
                                <Input
                                  name="firstName"
                                  value={data.firstName}
                                  label="First Name:"
                                  type="text"
                                  onChange={this.handleChange}
                                  error={errors.firstName}
                                />
                              </MDBCol>
                              <MDBCol>
                                <Input
                                  name="lastName"
                                  value={data.lastName}
                                  label="Last Name:"
                                  type="text"
                                  onChange={this.handleChange}
                                  error={errors.lastName}
                                />
                              </MDBCol>
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
                            </MDBCol>
                          </div>
                          <div className="text-center">
                            <button className="btn btn-primary">Update</button>
                          </div>
                        </form>
                      </div>
                    </Card.Body>
                  </Card>
                </MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
