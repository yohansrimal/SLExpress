import React from "react";
import styled from "styled-components";
import { MDBInput, MDBAnimation } from "mdbreact";

const Input = ({ name, label, value, onChange, error, type }) => {
  return (
    <React.Fragment>
      <InputForm>
        <MDBInput
          value={value}
          onChange={onChange}
          label={label}
          type={type}
          id={name}
          name={name}
        />

        {error && (
          <MDBAnimation type="shake">
            {" "}
            <div className="error">{error}</div>{" "}
          </MDBAnimation>
        )}
      </InputForm>
    </React.Fragment>
  );
};

export default Input;

const InputForm = styled.div`
  .error {
    font-size: 12px;
    padding: 0;
    margin-top: -20px;
    margin-bottom: 20px;
    color: red;
  }
`;
