import React, { Component } from "react";
import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import { Grid, Dimmer, Loader, Table, Segment } from "semantic-ui-react";
import { MDBAnimation } from "mdbreact";
import { Header, Icon, Button } from "semantic-ui-react";
import { Statistic } from "semantic-ui-react";
import { getEarnings } from "../../DeveloperServices/financeService";
import { retrieveData } from "../../DeveloperServices/userService";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default class earnings extends Component {
  state = {
    loading: true,
    data: [],
    userData: [],
  };

  componentDidMount = async () => {
    try {
      const response = await getEarnings();
      const userRespone = await retrieveData();
      this.setState({
        data: response.data,
        userData: userRespone.data,
        loading: false,
      });

      console.log(response);
    } catch (ex) {}
  };

  splitDate = (paymentDate) => {
    var mydate = paymentDate;
    var date = mydate.split("T")[0];
    return date;
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
    doc.text(190, 140, "Earnings Report");

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
    const headers = [["SCRIPT NAME", "BUYER'S USERNAME", "PAYMENT", "DATE"]];

    const data = this.state.data.map((site) => [
      site.script.name,
      site.customer.username,
      "Rs." + site.payment + ".00",
      this.splitDate(site.paymentDate),
    ]);

    let content = {
      startY: 270,
      head: headers,
      body: data,
    };

    doc.autoTable(content);

    var totalEarning = 0;

    this.state.data.map(
      (site) => (totalEarning = totalEarning + Number(site.payment))
    );

    doc.setFontSize(12);
    let finalY = doc.lastAutoTable.finalY; // The y position on the page
    doc.text(41, finalY + 50, "Total Earnings: Rs." + totalEarning + ".00");

    doc.save("SLExpressEarningReport.pdf");
  };

  render() {
    var totalEarning = 0;

    this.state.data.map(
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
              <Header as="h2" centered>
                <Icon name="dollar sign" />
                <Header.Content>
                  My Earnings
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
                          <Table.HeaderCell>Script Name</Table.HeaderCell>
                          <Table.HeaderCell>Buyer's Username</Table.HeaderCell>
                          <Table.HeaderCell>Payment</Table.HeaderCell>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {this.state.data.map((rec, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{rec.script.name}</Table.Cell>
                            <Table.Cell>{rec.customer.username}</Table.Cell>
                            <Table.Cell>Rs.{rec.payment}.00</Table.Cell>
                            <Table.Cell>
                              {this.splitDate(rec.paymentDate)}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  )}

                  <Statistic.Group widths="one">
                    <Statistic>
                      <Statistic.Value>Rs. {totalEarning}.00</Statistic.Value>
                      <Statistic.Label>Total Earnings</Statistic.Label>
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
