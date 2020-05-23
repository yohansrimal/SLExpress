import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import Joi from "joi-browser";
import { Grid } from "semantic-ui-react";
import Swal from "sweetalert2";
import { changeUserPassword } from "../../DeveloperServices/userService";
import { Card, Button, CardDeck, Form } from "react-bootstrap";

class changePassword extends Component {
  state = {
    accPassword: { password: "", confirmPassword: "" },
    errors: {},
  };

  schema = {
    password: Joi.string().required().min(8).label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .options({ language: { any: { allowOnly: "must match password" } } }),
  };

  handleChange = ({ currentTarget: input }) => {
    const accPassword = { ...this.state.accPassword };
    accPassword[input.name] = input.value;
    this.setState({ accPassword });
  };

  validate = () => {
    const result = Joi.validate(this.state.accPassword, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.updatePassword();
  };

  updatePassword = async () => {
    Swal.queue([
      {
        title: "Changing Password...",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      },
    ]);
    try {
      await changeUserPassword(this.state.accPassword.password);
      Swal.fire({
        icon: "success",
        title: "Password updated successfully",
        footer: "You've been sign out automatically. Please sign in again.",
        showConfirmButton: false,
        timer: 2500,
      }).then(function () {
        window.location = "/logout";
      });
    } catch (ex) {}
  };

  render() {
    return (
      <React.Fragment>
        <SubNavigation />
        <div class="container-fluid">
          <Grid>
            <Grid.Column width={3}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={13}>
              <CardDeck>
                <Card>
                  <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Enter new password"
                          onChange={this.handleChange}
                        />
                        <Form.Text className="text-danger">
                          {this.state.errors && this.state.errors.password}
                        </Form.Text>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          placeholder="Enter new password again"
                          onChange={this.handleChange}
                        />
                        <Form.Text className="text-danger">
                          {this.state.errors &&
                            this.state.errors.confirmPassword}
                        </Form.Text>
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Change Password
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>

                <Card bg={"danger"} text={"white"}>
                  <Card.Body>
                    <Card.Title>Warning</Card.Title>
                    <div>
                      Enter a new password for your account. We highly recommend
                      you create a unique password - one that you don't use for
                      any other websites.
                    </div>
                    <div>
                      Note: You can't reuse your old password once you change
                      it. After change your password SLExpress will sign you
                      out. So you need to sign in again with your new password.
                    </div>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default changePassword;
