import React, { Component } from "react";
import {
  Grid,
  Dimmer,
  Loader,
  Button,
  Card,
  Header,
  Icon,
} from "semantic-ui-react";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import { MDBAnimation } from "mdbreact";
import { getTickets } from "../../DeveloperServices/messageService";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import SubmitTicketForm from "../../components/DeveloperComponents/SubmitTicket/submitticket";

export default class adminsupport extends Component {
  state = {
    loading: true,
    data: [],
  };

  async componentDidMount() {
    try {
      const response = await getTickets();
      this.setData(response);
    } catch (ex) {}
  }

  setData = (response) => {
    this.setState({
      data: response.data.tickets,
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
              <Header as="h2">
                <Icon name="comments icon" />
                <Header.Content>
                  Administrator Support
                  <Header.Subheader>Send us a message</Header.Subheader>
                </Header.Content>
              </Header>

              {this.state.loading ? (
                <div>
                  {""}
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </div>
              ) : (
                <MDBAnimation type="fadeIn">
                  {this.state.data && this.state.data.length > 0 ? (
                    <SubmitTicketForm />
                  ) : null}

                  {this.state.data && this.state.data.length > 0 ? (
                    <Card.Group itemsPerRow="2">
                      {this.state.data.map((ticket) => (
                        <Card key={ticket._id}>
                          <Card.Content>
                            <Card.Header>{ticket.title}</Card.Header>
                          </Card.Content>

                          <Card.Content>
                            <Card.Description>
                              {ticket.ticketText}
                            </Card.Description>
                          </Card.Content>

                          <Card.Content extra>
                            <Grid container centered columns={3}>
                              <Grid.Column>
                                {ticket.adminReplies.length +
                                  ticket.userReplies.length}{" "}
                                <Icon size="large" name="reply" />
                              </Grid.Column>
                              <Grid.Column>
                                {ticket.open === true ? (
                                  <Icon size="large" name="lock open" />
                                ) : (
                                  <Icon size="large" name="lock" />
                                )}
                              </Grid.Column>
                              <Grid.Column>
                                <Moment fromNow>{ticket.time}</Moment>
                              </Grid.Column>
                            </Grid>
                          </Card.Content>
                          <Card.Content extra>
                            <div className="ui two buttons">
                              <Link to={`/viewticket/${ticket._id}`}>
                                <Button primary animated>
                                  <Button.Content visible>View</Button.Content>
                                  <Button.Content hidden>
                                    <Icon
                                      size="large"
                                      name="comments outline"
                                    />
                                  </Button.Content>
                                </Button>
                              </Link>
                            </div>
                          </Card.Content>
                        </Card>
                      ))}
                    </Card.Group>
                  ) : (
                    <React.Fragment>
                      <Header as="h2" icon textAlign="center">
                        <Icon name="info circle" circular />
                        <Header.Content>Nothing to show</Header.Content>
                      </Header>
                      <Grid centered columns={6}>
                        <Grid.Column>
                          <SubmitTicketForm />
                        </Grid.Column>
                      </Grid>
                    </React.Fragment>
                  )}
                </MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
