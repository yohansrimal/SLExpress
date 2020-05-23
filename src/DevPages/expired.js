import React, { Component } from "react";
import expired from "../images/expired.jpg";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Expired extends Component {
  render() {
    return (
      <React.Fragment>
        <section className=" text-center section-padding-100-0 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img
                  style={{ paddingTop: "3rem" }}
                  src={expired}
                  alt="Session Expired"
                />
                <h2>Your Session Has Expired!</h2>
                <p style={{ fontWeight: "bold", color: "red" }}>
                  Please sign in again SLExpress account.
                </p>
                <div style={{ paddingBottom: "5rem" }}>
                  <Link
                    to="/login"
                    style={{ fontWeight: "bold", color: "#fff" }}
                  >
                    <Button variant="info">Sign in</Button>
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

export default Expired;
