import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { viewTicket } from "../../DeveloperServices/messageService";
import { MDBAnimation } from "mdbreact";
import { Grid, Dimmer, Loader, Icon, Card } from "semantic-ui-react";
import { Button, Comment, Form, Header, Segment } from "semantic-ui-react";
import _ from "lodash";
import Moment from "react-moment";
import { reply } from "../../DeveloperServices/messageService";
import Swal from "sweetalert2";

class ViewTicket extends Component {
  state = {
    ticketId: "",
    reply: "",
    data: [],
    adminReplies: [],
    userReplies: [],
    cUserReplies: [],
    sortedMessages: [],
    loading: true,
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    try {
      const response = await viewTicket(id);
      this.setData(response, id);
    } catch (ex) {}
  };

  setData = (response, id) => {
    this.setState({
      data: response.data.ticket,
      adminReplies: response.data.ticket.adminReplies,
      userReplies: response.data.ticket.userReplies,
      loading: false,
      ticketId: id,
    });
    this.sortReplies();
  };

  sortReplies = (e) => {
    var userReplies = this.state.userReplies.map((reply) => {
      return {
        userReply: reply.replyId.userReply,
        time: reply.replyId.time,
      };
    });
    this.setState({ cUserReplies: userReplies });

    const allmessages = [
      ...this.state.adminReplies,
      ...this.state.cUserReplies,
    ];
    var sortMsg = _.orderBy(allmessages, ["replyId.time", "time"], ["asc"]);
    this.setState({ sortedMessages: sortMsg });
  };

  handleChange = (e) => {
    this.setState({ reply: e.currentTarget.value });
  };

  handeSubmit = async (e) => {
    e.preventDefault();
    Swal.queue([
      {
        title: "Sending Message...",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      },
    ]);

    try {
      const replyStatus = await reply(this.state.ticketId, this.state.reply);

      if (replyStatus.status === 200) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Your reply has been sent.",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          window.location.reload();
        });
      }
    } catch (ex) {
      if (ex.response.status === 403) {
        Swal.close();
        Swal.fire({
          icon: "info",
          text: "This ticket has been closed.",
        });
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
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
                  <Header as="h2">
                    <Icon name="comments icon" />
                    <Header.Content>
                      Administrator Support
                      <Header.Subheader>Send us a message</Header.Subheader>
                    </Header.Content>
                  </Header>

                  <Grid centered columns={2}>
                    <Grid.Column>
                      <Comment.Group>
                        <Header as="h3" dividing>
                          {this.state.data.title}
                        </Header>
                        <Segment style={{ overflow: "auto", maxHeight: 280 }}>
                          {this.state.sortedMessages.map((msg) => (
                            <Card.Group>
                              {msg.adminReply ? (
                                <Card fluid="true" color="violet">
                                  <Card.Content textAlign="left">
                                    <Comment>
                                      <Comment.Author as="a">
                                        {msg.adminReply
                                          ? "Administrator"
                                          : "Me"}
                                      </Comment.Author>
                                      <div>
                                        <Comment.Metadata>
                                          <Moment fromNow>{msg.time}</Moment>
                                        </Comment.Metadata>
                                      </div>
                                      <Comment.Text>
                                        {msg.adminReply
                                          ? msg.adminReply
                                          : msg.userReply}
                                      </Comment.Text>
                                    </Comment>
                                  </Card.Content>
                                </Card>
                              ) : (
                                <Card fluid="true">
                                  <Card.Content textAlign="right">
                                    <Comment>
                                      <Comment.Author as="a">
                                        {msg.adminReply
                                          ? "Administrator"
                                          : "Me"}
                                      </Comment.Author>
                                      <div>
                                        <Comment.Metadata>
                                          <Moment fromNow>{msg.time}</Moment>
                                        </Comment.Metadata>
                                      </div>
                                      <Comment.Text>
                                        {msg.adminReply
                                          ? msg.adminReply
                                          : msg.userReply}
                                      </Comment.Text>
                                    </Comment>
                                  </Card.Content>
                                </Card>
                              )}
                            </Card.Group>
                          ))}
                        </Segment>

                        <Form onSubmit={this.handeSubmit}>
                          <Form.TextArea
                            name="reply"
                            id="reply"
                            onChange={this.handleChange}
                          />
                          {this.state.reply === "" ? (
                            <Button
                              content="Add Reply"
                              labelPosition="left"
                              icon="edit"
                              disabled
                              primary
                            />
                          ) : (
                            <Button
                              content="Send Reply"
                              labelPosition="left"
                              icon="edit"
                              primary
                              centered
                            />
                          )}
                        </Form>
                      </Comment.Group>
                    </Grid.Column>
                  </Grid>
                </MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewTicket;
