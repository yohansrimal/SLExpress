import React, { Component } from "react";
import {
  Button,
  Card,
  Image,
  Input,
  Divider,
  Tab,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { Header, Icon } from "semantic-ui-react";
import { MDBAnimation } from "mdbreact";
import {
  viewWebsites,
  deleteSite,
} from "../../../DeveloperServices/webService";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../config.json";

class WebsiteList extends Component {
  state = {
    loading: true,
    data: [],
    search: "",
    active: [],
    pending: [],
  };

  async componentDidMount() {
    try {
      const response = await viewWebsites();
      this.setData(response);
    } catch (ex) {}
  }

  setData = (response) => {
    this.setState({
      data: response.data.scripts,
      loading: false,
    });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  handleDelete = (s_id) => {
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
          await deleteSite(s_id);
          Swal.fire("Deleted!", "Your website has been deleted.", "success");
          this.handleUpdateDeleteView(s_id);
        } catch (ex) {
          if (ex.response.status === 403) {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "Cannot Delete Script!",
              footer: "Script is already being used by some customers",
            });
          } else if (ex.response.status === 422) {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "Script already deleted!",
              footer: "Please refresh page!",
            });
          }
        }
      }
    });
  };

  handleUpdateDeleteView = (s_id) => {
    const data = this.state.data.filter((site) => site._id !== s_id);
    this.setState({ data });
  };

  render() {
    let activeSites = this.state.data.filter((site) => site.approved === true);
    let pendingSites = this.state.data.filter(
      (site) => site.approved === false
    );

    let filteredSites = this.state.data.filter((site) => {
      return (
        site.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    const panes = [
      {
        menuItem: "All",
        render: () => (
          <Tab.Pane>
            {this.state.data.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                <Icon name="info circle" circular />
                <Header.Content>Nothing to show</Header.Content>
                <Header.Subheader>
                  You are not uploaded any websites yet.
                </Header.Subheader>
              </Header>
            ) : (
              <Card.Group itemsPerRow="4" stackable="true">
                {this.state.data.map((site) => (
                  <Card key={site._id} raised="true">
                    <Image size="medium" src={apiUrl + site.image} />
                    <Card.Content>
                      <Card.Header>{site.name}</Card.Header>

                      {site.approved ? (
                        <Card.Meta>Approved</Card.Meta>
                      ) : (
                        <Card.Meta>Pending</Card.Meta>
                      )}

                      <Card.Description>
                        <strong>Rs. {site.price}</strong>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button.Group fluid="true">
                        <Link to={`/viewsite/${site._id}`}>
                          <Button positive size="medium">
                            View
                          </Button>
                        </Link>
                        <Link to={`/editsite/${site._id}`}>
                          <Button primary size="medium">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          negative
                          size="medium"
                          onClick={() => this.handleDelete(site._id)}
                        >
                          Delete
                        </Button>
                      </Button.Group>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Active",
        render: () => (
          <Tab.Pane>
            {activeSites.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                <Icon name="info circle" circular />
                <Header.Content>Nothing to show</Header.Content>
                <Header.Subheader>
                  You are not uploaded any websites yet.
                </Header.Subheader>
              </Header>
            ) : (
              <Card.Group itemsPerRow="4" stackable="true">
                {this.state.data.map((site) =>
                  site.approved === true ? (
                    <React.Fragment>
                      <Card key={site._id} raised="true">
                        <Image size="medium" src={apiUrl + site.image} />
                        <Card.Content>
                          <Card.Header>{site.name}</Card.Header>
                          <Card.Description>
                            <strong>Rs. {site.price}</strong>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Button.Group fluid="true">
                            <Link to={`/viewsite/${site._id}`}>
                              <Button positive size="medium">
                                View
                              </Button>
                            </Link>
                            <Link to={`/editsite/${site._id}`}>
                              <Button primary size="medium">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              negative
                              size="medium"
                              onClick={() => this.handleDelete(site._id)}
                            >
                              Delete
                            </Button>
                          </Button.Group>
                        </Card.Content>
                      </Card>
                    </React.Fragment>
                  ) : null
                )}
              </Card.Group>
            )}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Pending",
        render: () => (
          <Tab.Pane>
            {pendingSites.length === 0 && this.state.data.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                <Icon name="info circle" circular />
                <Header.Content>Nothing to show</Header.Content>
                <Header.Subheader>
                  You are not uploaded any websites yet.
                </Header.Subheader>
              </Header>
            ) : pendingSites.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                <Icon name="file code outline" circular />
                <Header.Content>Nothing to show</Header.Content>
                <Header.Subheader>
                  Your all sites has been approved.
                </Header.Subheader>
              </Header>
            ) : (
              <Card.Group itemsPerRow="4" stackable="true">
                {this.state.data.map((site) =>
                  site.approved === false ? (
                    <React.Fragment>
                      <Card key={site._id} raised="true">
                        <Image size="medium" src={apiUrl + site.image} />
                        <Card.Content>
                          <Card.Header>{site.name}</Card.Header>
                          <Card.Description>
                            <strong>Rs. {site.price}</strong>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Button.Group fluid="true">
                            <Link to={`/viewsite/${site._id}`}>
                              <Button positive size="medium">
                                View
                              </Button>
                            </Link>
                            <Link to={`/editsite/${site._id}`}>
                              <Button primary size="medium">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              negative
                              size="medium"
                              onClick={() => this.handleDelete(site._id)}
                            >
                              Delete
                            </Button>
                          </Button.Group>
                        </Card.Content>
                      </Card>
                    </React.Fragment>
                  ) : null
                )}
              </Card.Group>
            )}
          </Tab.Pane>
        ),
      },

      {
        menuItem: "Search",
        render: () => (
          <Tab.Pane>
            {this.state.data.length === 0 ? (
              <Input fluid icon="search" placeholder="Search..." disabled />
            ) : (
              <Input
                fluid
                icon="search"
                placeholder="Search..."
                onChange={this.handleSearch}
              />
            )}
            <Divider horizontal>Search Results</Divider>

            {this.state.data.length === 0 ? (
              <Header as="h2" icon textAlign="center">
                <Icon name="search" circular />
                <Header.Content>Nothing to search</Header.Content>
                <Header.Subheader>
                  You are not uploaded any websites yet.
                </Header.Subheader>
              </Header>
            ) : (
              <Card.Group itemsPerRow="4" stackable="true">
                {filteredSites.map((site) => (
                  <React.Fragment>
                    <Card key={site._id} raised="true">
                      <Image size="medium" src={apiUrl + site.image} />
                      <Card.Content>
                        <Card.Header>{site.name}</Card.Header>

                        {site.approved ? (
                          <Card.Meta>Approved</Card.Meta>
                        ) : (
                          <Card.Meta>Pending</Card.Meta>
                        )}

                        <Card.Description>
                          <strong>Rs. {site.price}</strong>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Button.Group fluid="true">
                          <Link to={`/viewsite/${site._id}`}>
                            <Button positive size="medium">
                              View
                            </Button>
                          </Link>
                          <Link to={`/editsite/${site._id}`}>
                            <Button primary size="medium">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            negative
                            size="medium"
                            onClick={() => this.handleDelete(site._id)}
                          >
                            Delete
                          </Button>
                        </Button.Group>
                      </Card.Content>
                    </Card>
                  </React.Fragment>
                ))}
              </Card.Group>
            )}
          </Tab.Pane>
        ),
      },
    ];
    return (
      <div>
        {" "}
        {this.state.loading ? (
          <div>
            {" "}
            <Dimmer active inverted>
              <Loader inverted></Loader>
            </Dimmer>
          </div>
        ) : (
          <div>
            <MDBAnimation type="fadeIn">
              <Tab panes={panes} defaultActiveIndex={0} />
            </MDBAnimation>
          </div>
        )}
      </div>
    );
  }
}

export default WebsiteList;
