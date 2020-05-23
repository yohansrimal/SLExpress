import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { viewWebsites } from "../../DeveloperServices/webService";

import { Grid, Header, Icon, Dimmer, Loader } from "semantic-ui-react";
import { MDBAnimation } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";

class Sidebar extends Component {
  state = {
    loading: true,
    websiteData: [],
  };

  async componentDidMount() {
    try {
      const response = await viewWebsites();
      this.setState({
        websiteData: response.data.scripts,
        loading: false,
      });
    } catch (ex) {}
  }

  render() {
    var buyers = 0;

    this.state.websiteData.map(
      (site) => (buyers = buyers + site.customers.length)
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
                <Icon name="money" />
                <Header.Content>
                  Change My Banking Details
                  <Header.Subheader>
                    You can update your banking details.
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
                <MDBAnimation type="fadeIn"></MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;
