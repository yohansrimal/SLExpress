import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { viewWebsites } from "../../DeveloperServices/webService";
import { apiUrl } from "../../config.json";
import { Link } from "react-router-dom";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import {
  Grid,
  Header,
  Icon,
  Dimmer,
  Loader,
  GridColumn,
  Statistic,
} from "semantic-ui-react";
import { MDBAnimation } from "mdbreact";
import { getEarnings } from "../../DeveloperServices/financeService";
import "bootstrap/dist/css/bootstrap.min.css";

class Sidebar extends Component {
  state = {
    loading: true,
    websiteData: [],
    earningData: [],
  };

  async componentDidMount() {
    try {
      const response = await viewWebsites();
      const earningresponse = await getEarnings();
      this.setState({
        websiteData: response.data.scripts,
        earningData: earningresponse.data,
        loading: false,
      });
    } catch (ex) {}
  }

  render() {
    var buyers = 0;
    var totalEarning = 0;

    this.state.websiteData.map(
      (site) => (buyers = buyers + site.customers.length)
    );

    this.state.earningData.map(
      (site) => (totalEarning = totalEarning + Number(site.payment))
    );

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
                <Icon name="dashcube" />
                <Header.Content>
                  My Dashboard
                  <Header.Subheader>
                    Summary of your SLExpress Account
                  </Header.Subheader>
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
                  <Grid>
                    <Grid.Row columns={2}>
                      <GridColumn></GridColumn>
                      <GridColumn>
                        <MDBContainer>
                          <MDBCarousel
                            activeItem={1}
                            length={this.state.websiteData.length}
                            showControls={true}
                            showIndicators={false}
                          >
                            <MDBCarouselInner>
                              {this.state.websiteData.map((site, index) =>
                                site.approved === true ? (
                                  <MDBCarouselItem itemId={index + 1}>
                                    <MDBView>
                                      <img
                                        className="d-block w-100"
                                        src={apiUrl + site.image}
                                        alt=""
                                      />
                                      <MDBMask overlay="black-light" />
                                    </MDBView>
                                    <MDBCarouselCaption>
                                      <h3 className="h3-responsive">
                                        {site.name}
                                      </h3>
                                    </MDBCarouselCaption>
                                  </MDBCarouselItem>
                                ) : null
                              )}
                            </MDBCarouselInner>
                          </MDBCarousel>
                        </MDBContainer>
                      </GridColumn>
                    </Grid.Row>

                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <MDBCol style={{ maxWidth: "22rem" }}>
                          <MDBCard>
                            <MDBCardBody>
                              <MDBCardTitle>
                                <Icon name="world" size="large" /> My Websites
                              </MDBCardTitle>

                              <div className=" text-center align-items-center">
                                <MDBCardText>
                                  <Header size="huge">
                                    {this.state.websiteData.length} Sites
                                  </Header>
                                </MDBCardText>
                                <Link to={`/mywebsites`}>
                                  <MDBBtn color="primary">See More</MDBBtn>
                                </Link>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </Grid.Column>

                      <Grid.Column>
                        <MDBCol style={{ maxWidth: "22rem" }}>
                          <MDBCard>
                            <MDBCardBody>
                              <MDBCardTitle>
                                <Icon name="dollar sign" size="large" />{" "}
                                Earnings
                              </MDBCardTitle>
                              <div className=" text-center align-items-center">
                                <MDBCardText>
                                  <Header size="huge">
                                    Rs.{totalEarning}.00
                                  </Header>
                                </MDBCardText>
                                <Link to={`/earnings`}>
                                  <MDBBtn color="success">See More</MDBBtn>
                                </Link>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </Grid.Column>

                      <Grid.Column>
                        <MDBCol style={{ maxWidth: "22rem" }}>
                          <MDBCard>
                            <MDBCardBody>
                              <MDBCardTitle>
                                {" "}
                                <Icon name="users" size="large" /> Cutomer Hub
                              </MDBCardTitle>
                              <div className=" text-center align-items-center">
                                <MDBCardText>
                                  <Header size="huge">
                                    {buyers} Customers
                                  </Header>
                                </MDBCardText>
                                <Link to={`/webanalysis`}>
                                  <MDBBtn color="secondary">See More</MDBBtn>
                                </Link>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </Grid.Column>
                    </Grid.Row>
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

export default Sidebar;
