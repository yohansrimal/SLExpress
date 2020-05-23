import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import homePageImage from "../../images/homePageImage.png";

const Banner = () => {
  return (
    <React.Fragment>
      <BannerWrapper>
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-md-6 col-lg-6">
              <div className="row align-items-end">
                <div className="col-12">
                  <h1>
                    WE'RE HIRING <br /> Earn money with your skills
                  </h1>
                </div>
                <div>
                  <Link to="/login" style={{ paddingLeft: "2rem" }}>
                    <button type="button"> Register </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <img
                style={{ paddingTop: "3rem" }}
                src={homePageImage}
                alt="homePageImage"
              />
            </div>
          </div>
        </div>
      </BannerWrapper>
    </React.Fragment>
  );
};

export default Banner;

const BannerWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 190px);
  display: flex;
  align-items: center;

  /* brings content to the mid  update when device changes*/
  padding-bottom: 6rem;

  img {
    width: 100%;
  }

  h1 {
    font-size: 4rem;
    color: #2fa7d9;
    text-align: center;

    @media (max-width: 992px) {
      font-size: 3rem;
    }
  }

  h3 {
    font-size: 2rem;
    color: #2fa7d9;
  }

  p {
    font-size: 1.2rem;
    color: #2fa7d9;
  }

  button {
    margin-left: 65%;
    position: relative;
    z-index: 1;
    text-align: center;
    min-width: 205px;
    height: 50px;
    line-height: 50px;
    font-size: 21px;
    font-weight: 600;
    display: inline-block;
    padding: 0 40px;
    text-align: center;
    text-transform: capitalize;
    color: #fff;
    background-color: #2fa7d9;
    border: none;
    border-radius: 100px;
    -webkit-transition-duration: 500ms;
    -o-transition-duration: 500ms;
    transition-duration: 500ms;
    outline: none;
    margin-top: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 414px) {
      margin-left: 52%;
    }

    @media (max-width: 375px) {
      margin-left: 41%;
    }

    @media (max-width: 320px) {
      margin-left: 28%;
    }

    &:hover {
      color: #fff;
      background-color: #1c66de;
    }
  }
`;
