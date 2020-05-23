import React, { Component } from "react";
import error404Image from "../images/error404Image.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class error404 extends Component {
  render() {
    return (
      <React.Fragment>
        <section className=" text-center section-padding-100-0 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img
                  style={{ paddingTop: "3rem" }}
                  src={error404Image}
                  alt="error404Image"
                />
                <h2>Opps! This page Could Not Be Found!</h2>
                <p style={{ fontWeight: "bold", color: "#b2bec3" }}>
                  Sorry bit the page you are looking for does not exist, have
                  been removed or name changed
                </p>
                <div style={{ paddingBottom: "5rem" }}>
                  <Link to="/" style={{ fontWeight: "bold", color: "#fff" }}>
                    <Button variant="info"> Go To Home </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
