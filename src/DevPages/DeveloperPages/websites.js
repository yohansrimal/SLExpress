import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { Grid } from "semantic-ui-react";
import WebList from "../../components/DeveloperComponents/webList/websiteList";
import { Header, Icon } from "semantic-ui-react";

class Websites extends Component {
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
              <Header as="h2" centered>
                <Icon name="cloud icon" />
                <Header.Content>
                  My Websites
                  <Header.Subheader>
                    All the websites you upload.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <div>
                <WebList />
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default Websites;
