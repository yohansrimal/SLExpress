import React from "react";
import { Grid, Dimmer, Loader, Divider } from "semantic-ui-react";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import { Card, Button, CardDeck } from "react-bootstrap";
import { retrieveData } from "../../DeveloperServices/userService";
import { MDBAnimation } from "mdbreact";
import Form from "../../components/DeveloperComponents/common/form";
import Swal from "sweetalert2";
import { deleteUser } from "../../DeveloperServices/loginService";

export default class myProfile extends Form {
  state = {
    loading: true,
    data: {},
  };

  async componentDidMount() {
    try {
      const response = await retrieveData();
      this.setData(response);
    } catch (ex) {}
  }

  setData = (response) => {
    console.log(response);
    this.setState({
      loading: false,
      data: response.data,
    });
  };

  toProfileEdit = () => {
    window.location = "/editprofile";
  };

  toPasswordChange = () => {
    window.location = "/changepassword";
  };

  deleteProfile = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        try {
          deleteUser();
          Swal.fire({
            icon: "success",
            title: "Account deleted successfuly",
            footer: "Thank you for being with us.",
            showConfirmButton: false,
            timer: 2500,
          }).then(function () {
            window.location = "/logout";
          });
        } catch (e) {}
      }
    });
  };

  render() {
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
                  <CardDeck>
                    <Card>
                      <Card.Header as="h3">Personal Information</Card.Header>
                      <Card.Body>
                        <div> First Name: {this.state.data.firstName}</div>
                        <Divider horizontal />
                        <div> Last Name: {this.state.data.lastName}</div>
                        <Divider horizontal />
                        <div> Username: {this.state.data.username}</div>
                        <Divider horizontal />
                        <div> Email: {this.state.data.email}</div>
                        <Divider horizontal />
                        <div> Contact Number: {this.state.data.phone}</div>
                        <Divider horizontal />
                        <Button variant="primary" onClick={this.toProfileEdit}>
                          Edit Profile
                        </Button>
                      </Card.Body>
                    </Card>

                    <Card>
                      <Card.Header as="h3">
                        Change Password and Account Deletion
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>If you change your password:</Card.Title>
                        <div>
                          Choose a strong password and do not reuse it for any
                          other accounts.
                        </div>
                        <Divider horizontal />
                        <Button variant="dark" onClick={this.toPasswordChange}>
                          Change Password
                        </Button>
                      </Card.Body>

                      <Card.Body>
                        <Card.Title>If you delete your account:</Card.Title>
                        <div>
                          Account deletion is an irreversible operation and
                          cannot be undone.
                        </div>
                        <Divider horizontal />
                        <Button variant="danger" onClick={this.deleteProfile}>
                          Delete Account
                        </Button>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
