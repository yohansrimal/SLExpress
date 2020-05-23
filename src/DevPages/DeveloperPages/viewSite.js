import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { viewWebsites } from "../../DeveloperServices/webService";
import { MDBAnimation } from "mdbreact";

import { Card, Button, CardDeck } from "react-bootstrap";
import { Grid, Dimmer, Loader, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../config.json";
import http from "../../DeveloperServices/httpService";

class viewSite extends Component {
  state = {
    scriptId: "",
    data: [],
    loading: true,
    categories: [],
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    try {
      const response = await viewWebsites();
      const url = "http://slexpress.tk:3000/sites/getCategories";
      const catResponse = await http.get(url);
      this.setData(response, id, catResponse);
    } catch (ex) {}
  };

  setData = (response, id, catResponse) => {
    this.setState({
      data: response.data.scripts,
      loading: false,
      scriptId: id,
      categories: catResponse.data,
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
                  {this.state.data.map((site) =>
                    site._id === this.state.scriptId ? (
                      <React.Fragment>
                        <CardDeck>
                          <Card key={site._id}>
                            <Card.Header as="h3">{site.name}</Card.Header>
                            <Card.Body>
                              <Image size="large" src={apiUrl + site.image} />
                            </Card.Body>
                          </Card>

                          <Card>
                            <Card.Header as="h3">Details</Card.Header>
                            <Card.Body>
                              <Card.Title>Description</Card.Title>
                              <Card.Text>{site.description}</Card.Text>
                              <Card.Title>Price: Rs.{site.price}</Card.Title>
                              <Card.Title>
                                Status: {site.approved ? "Active" : "Pending"}
                              </Card.Title>

                              {this.state.categories.map((cat) =>
                                cat._id === site.categories[0] ? (
                                  <Card.Title>Category: {cat.name}</Card.Title>
                                ) : null
                              )}
                              <Link to={`/editsite/${site._id}`}>
                                <Button primary size="medium">
                                  Edit
                                </Button>
                              </Link>
                            </Card.Body>
                          </Card>
                        </CardDeck>
                      </React.Fragment>
                    ) : null
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

export default viewSite;
