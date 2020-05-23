import React from "react";
import styled from "styled-components";
import { MDBAnimation } from "mdbreact";

const Error = ({ error }) => {
  return (
    <React.Fragment>
      <ErrorWrapper>
        {error && (
          <MDBAnimation type="shake">
            {" "}
            <div className="errorLabel">{error}</div>{" "}
          </MDBAnimation>
        )}
      </ErrorWrapper>
    </React.Fragment>
  );
};

export default Error;

const ErrorWrapper = styled.div`
  .errorLabel {
    font-size: 12px;
    padding: 0;
    padding-left: 5px;
    margin-bottom: 20px;
    color: red;
  }
`;
