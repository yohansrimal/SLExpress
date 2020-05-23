import React, { Component } from "react";
import Joi from "joi-browser";
import { MDBAnimation } from "mdbreact";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateSite } from "../../DeveloperServices/webService";
import { viewWebsites } from "../../DeveloperServices/webService";
import http from "../../DeveloperServices/httpService";

import SubNavigation from "../../components/DeveloperComponents/SubNavigation/Navbar";
import SideMenu from "../../components/DeveloperComponents/SideBar/SideMenu";
import Error from "../../components/DeveloperComponents/Error/error";

class editSite extends Component {
  state = {
    scriptId: "",
    description: "",
    filename: "",
    price: "",
    category: "",

    data: [],
    errors: {},

    Categories: [],

    loading: false,
  };

  schema = {
    filename: Joi.string().required().min(5),

    description: Joi.string().required().min(50),

    price: Joi.string()
      .regex(/^[0-9]+\.[0-9]{2}$|[0-9]+\.[0-9]{2}[^0-9]/)
      .required(),

    category: Joi.string().required(),

    errors: Joi.allow(),
    Categories: Joi.allow(),
    loading: Joi.allow(),
    imageError: Joi.allow(),
    data: Joi.allow(),
    scriptId: Joi.allow(),
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const viewResponse = await viewWebsites();
      const url = "http://slexpress.tk:3000/sites/getCategories";
      const response = await http.get(url);

      {
        viewResponse.data.scripts.map((site) =>
          site._id === id
            ? this.setState({
                scriptId: site._id,
                description: site.description,
                filename: site.name,
                price: site.price,
                Categories: response.data,
                loading: false,
              })
            : null
        );
      }
    } catch (ex) {}
  }

  //Text Input Onchange Function and Store data into state
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({
      [input.id]: input.value,
      errors,
    });
  };

  //Text input validation in onChange
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  //Store selected category item and validate selected or not
  handleSelection = ({ currentTarget: input }) => {
    var index = input.selectedIndex;
    var optionElement = input.childNodes[index];
    var option = optionElement.getAttribute("id");

    const errors = { ...this.state.errors };
    const errorMessage = this.validateSelectProperty(optionElement);
    if (errorMessage) errors.category = errorMessage;
    else delete errors.category;

    this.setState({ category: option, errors });
  };

  //Selected property validation
  validateSelectProperty = ({ value }) => {
    const obj = { category: value };
    const schema = { category: this.schema.category };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  //Check before uploading is there any  validation errors
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  //Final validation of all fields before uploading
  validate = () => {
    const result = Joi.validate(this.state, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  //All data enter to the formData and send to https services components to upload
  doSubmit = async () => {
    Swal.queue([
      {
        title: "Updating data",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      },
    ]);

    try {
      const uploadStatus = await updateSite(
        this.state.filename,
        this.state.scriptId,
        this.state.description,
        this.state.price,
        this.state.category
      );

      if (uploadStatus.status == 200) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Script Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          window.location = "/mywebsites";
        });
      }
    } catch (ex) {}
  };

  render() {
    return (
      <React.Fragment>
        <SubNavigation />
        <div className="container-fluid">
          <Grid>
            <Grid.Column width={3}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={12}>
              {this.state.loading ? (
                <div>
                  {""}
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </div>
              ) : (
                <MDBAnimation type="fadeIn">
                  <WebWrapper>
                    <div
                      className="webupload"
                      style={{
                        width: "",
                      }}
                    >
                      <form className="ui form" onSubmit={this.handleSubmit}>
                        <h2 className="ui dividing header">
                          Edit Website Details
                        </h2>

                        <div className="two fields">
                          <div className="field">
                            <label style={{ fontSize: 15 }}>
                              Website Name:
                            </label>
                            <div className="field">
                              <input
                                value={this.state.filename}
                                type="text"
                                name="filename"
                                id="filename"
                                label="Website Name:"
                                onChange={this.handleChange}
                                placeholder="Enter Website Name Here"
                              />
                            </div>
                            <Error error={this.state.errors.filename} />
                          </div>

                          <div className="field">
                            <label style={{ fontSize: 15 }}>Category:</label>
                            <select onChange={this.handleSelection}>
                              <option selected disabled>
                                Select Category
                              </option>
                              {this.state.Categories.map((category) => (
                                <option id={category._id} key={category._id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                            <Error error={this.state.errors.category} />
                          </div>
                        </div>

                        <div className="field">
                          <label style={{ fontSize: 15 }}>Description: </label>
                          <textarea
                            value={this.state.description}
                            type="textarea"
                            name="description"
                            id="description"
                            onChange={this.handleChange}
                            placeholder="Enter Website Description Here..."
                          ></textarea>
                          <Error error={this.state.errors.description} />
                        </div>

                        <div className="two fields">
                          <div className="field">
                            <label style={{ fontSize: 15 }}>Price:</label>
                            <div className="field">
                              <input
                                value={this.state.price}
                                type="text"
                                name="price"
                                id="price"
                                onChange={this.handleChange}
                                placeholder="Enter Price Here (1000.00 or 1000)"
                              />
                            </div>
                            <Error error={this.state.errors.price} />
                          </div>

                          <div className="field"></div>
                        </div>

                        <div className="text-center logbutton">
                          <button className="btn btn-primary">
                            Update Site
                          </button>
                        </div>
                      </form>
                    </div>
                  </WebWrapper>
                </MDBAnimation>
              )}
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default editSite;

const WebWrapper = styled.div`
  .webupload {
    border-width: 1px;
    padding: 15px;
    border-radius: 10px;
    position: relative;
  }
`;
