import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { Grid, Dimmer, Loader, Table } from "semantic-ui-react";
import { MDBAnimation } from "mdbreact";
import { viewWebsites } from "../../DeveloperServices/webService";
import { Header, Icon, Button } from "semantic-ui-react";
import { Statistic, Segment } from "semantic-ui-react";
import { retrieveData } from "../../DeveloperServices/userService";
import jsPDF from "jspdf";
import "jspdf-autotable";

class WebAnalysis extends Component {
  state = {
    loading: true,
    data: [],
    userData: [],
  };

  componentDidMount = async () => {
    try {
      const response = await viewWebsites();
      const userRespone = await retrieveData();

      this.setState({
        data: response.data.scripts,
        userData: userRespone.data,
        loading: false,
      });
    } catch (ex) {}
  };

  generatePdf = () => {
    var doc = new jsPDF("p", "pt");
    doc.rect(
      20,
      20,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      "S"
    );

    doc.setTextColor(47, 167, 217);
    doc.setFontSize(32);
    doc.text(30, 55, "SLExpress");
    doc.setFontSize(12);
    doc.text(415, 40, "Email: admin@slexpress.lk");
    doc.text(440, 60, "Call Us: 077 714 5020");
    doc.line(20, 70, 575, 70);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.setFontType("bold");
    doc.text(190, 140, "Analysis Report");

    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();

    var time =
      +" " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    doc.setFontSize(10);
    doc.setFontType("normal");
    doc.text(40, 190, "Email: " + this.state.userData.email);
    doc.text(40, 205, "Username: " + this.state.userData.username);
    doc.text(40, 220, "Date: " + date);
    doc.text(40, 235, "Time: " + time);

    doc.setFontSize(15);
    const headers = [["WEBSITE NAME", "STATUS", "ALL BUYERS"]];

    const data = this.state.data.map((site) => [
      site.name,
      site.approved ? "Approved" : "Pending",
      site.customers.length,
    ]);

    let content = {
      startY: 270,
      head: headers,
      body: data,
    };

    doc.autoTable(content);

    var buyers = 0;
    var approvedSites = 0;
    var pendingSites = 0;

    {
      this.state.data.map(
        (site) => (
          (buyers = buyers + site.customers.length),
          site.approved
            ? (approvedSites = approvedSites + 1)
            : (pendingSites = pendingSites + 1)
        )
      );
    }

    doc.setFontSize(12);
    let finalY = doc.lastAutoTable.finalY; // The y position on the page
    doc.text(41, finalY + 50, "Total Websites: " + this.state.data.length);
    doc.text(41, finalY + 80, "Total Buyers: " + buyers);
    doc.text(41, finalY + 110, "Total Approved Websites: " + approvedSites);
    doc.text(41, finalY + 140, "Total Pending Websites: " + pendingSites);

    doc.save("SLExpressAnalysisReport.pdf");
  };

  render() {
    var buyers = 0;
    var approvedSites = 0;
    var pendingSites = 0;

    {
      this.state.data.map(
        (site) => (
          (buyers = buyers + site.customers.length),
          site.approved
            ? (approvedSites = approvedSites + 1)
            : (pendingSites = pendingSites + 1)
        )
      );
    }

    return (
      <React.Fragment>
        <SubNavigation />
        <div className="container-fluid">
          <Grid>
            <Grid.Column width={3}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as="h2" centered>
                <Icon name="chart line" />
                <Header.Content>
                  My Analysis
                  <Header.Subheader>
                    Web analysis for uploaded sites.
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
                  {this.state.data.length === 0 ? null : (
                    <Button
                      animated
                      content="Standard"
                      basic
                      floated="right"
                      onClick={this.generatePdf}
                    >
                      <Button.Content visible>Generate Report</Button.Content>
                      <Button.Content hidden>
                        <Icon name="file pdf outline" size="large" />
                      </Button.Content>
                    </Button>
                  )}

                  {this.state.data.length === 0 ? (
                    <Segment>
                      <Header as="h2" icon textAlign="center">
                        <Icon name="search" circular />
                        <Header.Content>No Data Found</Header.Content>
                        <Header.Subheader>
                          You are not uploaded any websites yet.
                        </Header.Subheader>
                      </Header>
                    </Segment>
                  ) : (
                    <Table celled selectable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Website Name</Table.HeaderCell>
                          <Table.HeaderCell>Status</Table.HeaderCell>
                          <Table.HeaderCell>All Buyers</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {this.state.data.map((site) => (
                          <Table.Row key={site._id}>
                            <Table.Cell>{site.name}</Table.Cell>
                            {site.approved ? (
                              <Table.Cell>
                                {site.approved ? "Approved" : "Pending"}
                              </Table.Cell>
                            ) : (
                              <Table.Cell warning>
                                {site.approved ? "Approved" : "Pending"}
                              </Table.Cell>
                            )}

                            <Table.Cell>
                              {site.customers.length === 0
                                ? "None"
                                : site.customers.length}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  )}

                  <Statistic.Group widths="four">
                    <Statistic>
                      <Statistic.Value>
                        {this.state.data.length}
                      </Statistic.Value>
                      <Statistic.Label>Websites</Statistic.Label>
                    </Statistic>

                    <Statistic>
                      <Statistic.Value>{buyers}</Statistic.Value>
                      <Statistic.Label>Buyers</Statistic.Label>
                    </Statistic>

                    <Statistic>
                      <Statistic.Value>{approvedSites}</Statistic.Value>
                      <Statistic.Label>Approved Sites</Statistic.Label>
                    </Statistic>

                    <Statistic>
                      <Statistic.Value>{pendingSites}</Statistic.Value>
                      <Statistic.Label>Pending Sites</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default WebAnalysis;
