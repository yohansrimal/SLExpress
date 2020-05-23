import React, { Component } from "react";
import styled from "styled-components";
import Banner from "../components/Banner/Banner";

class home extends Component {
  state = {};

  componentDidMount = () => {
    if (localStorage.getItem("token") !== null) {
      window.location = "/dashboard";
    }
  };

  render() {
    return (
      <HomePageWrapper>
        <div className="container-fluid">
          <div className="row">
            <Banner />
          </div>
        </div>
      </HomePageWrapper>
    );
  }
}

export default home;

const HomePageWrapper = styled.div`
  background-color: #ffffff;
  color: white;
`;
