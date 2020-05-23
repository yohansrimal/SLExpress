import React, { Component } from "react";
import { Card, Button, CardDeck } from "react-bootstrap";
import { Grid, Dimmer, Loader, Divider } from "semantic-ui-react";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import { MDBAnimation } from "mdbreact";
import { retrieveData } from "../../DeveloperServices/userService";

class bankingDetails extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await retrieveData();
      this.setData(response);
    } catch (ex) {}
  }

  setData = (response) => {
    console.log(response.data);
    this.setState({
      data: response.data,
      loading: false,
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
                      <Card.Header as="h3">Banking Details</Card.Header>
                      <Card.Body>
                        <div>
                          {" "}
                          Account Number:{" "}
                          {this.state.data.bankingDetails.accountNumber}
                        </div>
                        <Divider horizontal />
                        <div>
                          {" "}
                          Bank: {this.state.data.bankingDetails.bankName}
                        </div>
                        <Divider horizontal />
                        <div>
                          {" "}
                          Branch Code:{" "}
                          {this.state.data.bankingDetails.branchCode}
                        </div>
                        <Divider horizontal />
                        <Button variant="primary" onClick={this.toProfileEdit}>
                          Edit Banking Details
                        </Button>
                      </Card.Body>
                    </Card>

                    <Card>
                      <Card.Header as="h3">
                        How to withdraw your money?
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>
                          In the end of every month the total earnings will be
                          transfer to the given bank account details
                        </Card.Title>

                        <Divider horizontal />
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

export default bankingDetails;
