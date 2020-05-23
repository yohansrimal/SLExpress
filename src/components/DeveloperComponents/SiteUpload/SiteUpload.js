import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Joi from "joi-browser";
import { MDBAnimation } from "mdbreact";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Header, Icon } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";

import { uploadData } from "../../../DeveloperServices/webService";
import http from "../../../DeveloperServices/httpService";

import SubNavigation from "../SubNavigation/Navbar";
import SideMenu from "../SideBar/SideMenu";
import Error from "../Error/error";

class WebUpload extends Component {
  state = {
    description: "",
    filename: "",
    price: "",
    script: null,
    image: null,
    category: "",

    errors: {},

    imageError: {},
    Categories: [],

    loading: false,
  };

  schema = {
    filename: Joi.string().required().min(5),

    description: Joi.string().required().min(50),

    price: Joi.string()
      .regex(/^[0-9]+\.[0-9]{2}$|[0-9]+\.[0-9]{2}[^0-9]/)
      .required(),

    script: Joi.object().required(),

    image: Joi.object().required(),

    category: Joi.string().required(),

    errors: Joi.allow(),
    Categories: Joi.allow(),
    loading: Joi.allow(),
    imageError: Joi.allow(),
  };

  async componentDidMount() {
    try {
      const url = "http://slexpress.tk:3000/sites/getCategories";
      const response = await http.get(url);

      this.setState({ Categories: response.data, loading: false });
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

  //Script file store in state
  handleScriptFileChange = (files) => {
    this.setState({
      script: files[0],
    });
  };

  //Image File store in state and send image size checking function
  handleImageFileChange = (files) => {
    this.checkImageSize(files[0]);

    this.setState({
      image: files[0],
    });
  };

  //Image Size checking function and set or delete image size error in state
  checkImageSize = (e) => {
    if (e) {
      const scope = this;
      let reader = new FileReader();
      reader.readAsDataURL(e);
      reader.onload = (e) => {
        let img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          if (this.width != "960" && this.height != "600") {
            const imageError = { ...scope.state.imageError };
            imageError.image = "Image size must be 960 x 600 pixels";
            scope.setState({
              imageError,
            });
          }
        };
      };
    } else {
      const imageError = { ...this.state.imageError };
      delete imageError.image;
      this.setState({
        imageError,
      });
    }
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
    if (this.state.imageError.image) return;

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
    const formData = new FormData();
    formData.append("script", this.state.script);
    formData.append("image", this.state.image);
    formData.append("filename", this.state.filename);
    formData.append("price", this.state.price);
    formData.append("categories", this.state.category);
    formData.append("description", this.state.description);

    Swal.queue([
      {
        title: "Uploading Script",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      },
    ]);

    try {
      const uploadStatus = await uploadData(formData);

      if (uploadStatus.status == 200) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Script Upload Successfully",
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
                        <Header as="h2" centered>
                          <Icon name="cloud upload" />
                          <Header.Content>
                            Upload Website
                            <Header.Subheader>
                              Upload website with all the details.
                            </Header.Subheader>
                          </Header.Content>
                        </Header>

                        <div className="two fields">
                          <div className="field">
                            <label style={{ fontSize: 15 }}>
                              Website Name:
                            </label>
                            <div className="field">
                              <input
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

                        <div className="two fields">
                          <div className="field">
                            <label style={{ fontSize: 15 }}>Zip File:</label>
                            <div className="field">
                              <DropzoneArea
                                onChange={this.handleScriptFileChange}
                                acceptedFiles={["application/x-zip-compressed"]}
                                filesLimit={1}
                                maxFileSize={50000000}
                                showAlerts={false}
                                showFileNames={true}
                                dropzoneClass={"dropzone"}
                                dropzoneText={
                                  "Drag and drop a zip file here or click (.zip)"
                                }
                              />
                            </div>
                            <Error error={this.state.errors.script} />
                          </div>

                          <div className="field">
                            <label style={{ fontSize: 15 }}>Image File:</label>
                            <DropzoneArea
                              onChange={this.handleImageFileChange}
                              acceptedFiles={["image/jpeg"]}
                              filesLimit={1}
                              maxFileSize={20000000}
                              showAlerts={false}
                              showFileNames={true}
                              dropzoneClass={"dropzone"}
                              dropzoneText={
                                "Drag and drop an image file here or click (.jpeg)"
                              }
                            />
                            <Error error={this.state.errors.image} />
                            <Error error={this.state.imageError.image} />
                          </div>
                        </div>

                        <div className="text-center logbutton">
                          <button className="btn btn-primary">Upload</button>
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

export default WebUpload;

const WebWrapper = styled.div`
  .webupload {
    border-width: 1px;
    padding: 15px;
    border-radius: 10px;
    position: relative;
  }
`;
