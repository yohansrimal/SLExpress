import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuBar extends Component {
  state = {};
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Account Manager</Menu.Header>

          <Menu.Menu>
            <Link to={"/dashboard"}>
              <Menu.Item name="Dashboard" onClick={this.handleItemClick} />
            </Link>
            <Link to={"/myprofile"}>
              <Menu.Item name="View Profile" onClick={this.handleItemClick} />
            </Link>
            <Link to={"/editprofile"}>
              <Menu.Item
                name="Change Profile Details"
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Website Manager</Menu.Header>

          <Menu.Menu>
            <Link to={"/mywebsites"}>
              <Menu.Item name="My Websites" onClick={this.handleItemClick} />
            </Link>
            <Link to={"/webupload"}>
              <Menu.Item
                name="Upload a New Website"
                onClick={this.handleItemClick}
              />
            </Link>
            <Link to={"/webanalysis"}>
              <Menu.Item name="Web Analysis" onClick={this.handleItemClick} />
            </Link>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Finance Manager</Menu.Header>

          <Menu.Menu>
            <Link to={"/earnings"}>
              <Menu.Item name="Earnings" onClick={this.handleItemClick} />
            </Link>

            <Link to={"/viewbankingdetails"}>
              <Menu.Item
                name="View Bank Details"
                onClick={this.handleItemClick}
              />
            </Link>

            <Link to={"/editbankdetails"}>
              <Menu.Item
                name="Change Bank Details"
                onClick={this.handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
            <Link to={"/adminsupport"}>
              <Menu.Item name="email" onClick={this.handleItemClick}>
                Administrator Support
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
