import React from "react";
import { MDBAnimation, MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <React.Fragment>
      <MDBAnimation reveal type="bounceInUp">
        <div
          style={{
            position: "sticky",
          }}
        >
          <MDBFooter className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a href="https://www.slexpress.com"> SLExpress </a>
              </MDBContainer>
            </div>
          </MDBFooter>
        </div>
      </MDBAnimation>
    </React.Fragment>
  );
};

export default Footer;
