import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBInput } from "mdbreact";
import { submitTicket } from "../../../DeveloperServices/messageService";
import Swal from "sweetalert2";

class SubmitTicketForm extends Component {
  state = {
    setOpen: false,
    button: "disabled",
    ticketData: { title: "", message: "" },
  };

  handleClickOpen = () => {
    this.setState({
      setOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };

  handleChange = (e) => {
    const ticketData = { ...this.state.ticketData };
    ticketData[e.currentTarget.name] = e.currentTarget.value;
    if (ticketData.title === "" || ticketData.message === "") {
      this.setState({ ticketData, button: "disabled" });
    } else {
      this.setState({ ticketData, button: "enable" });
    }
  };

  handeSubmit = async (e) => {
    e.preventDefault();
    this.handleClose();
    Swal.queue([
      {
        title: "Sending Message...",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      },
    ]);

    try {
      const uploadStatus = await submitTicket(
        this.state.ticketData.title,
        this.state.ticketData.message
      );

      if (uploadStatus.status === 200) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Your ticket has been submitted.",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          window.location = "/adminsupport";
        });
      }
    } catch {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  render() {
    return (
      <div>
        <Button
          className="float-right"
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Submit New Ticket
        </Button>
        <Dialog
          open={this.state.setOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Submit New Ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Send your message, we will respond as soon as possible.
            </DialogContentText>

            <DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                label="Enter Title"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />
            </DialogContentText>
            <DialogContentText>
              <MDBInput
                type="textarea"
                id="message"
                name="message"
                label="Enter Message"
                onChange={this.handleChange}
                rows="5"
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {this.state.button === "disabled" ? (
              <Button color="primary" disabled>
                Send
              </Button>
            ) : (
              <Button onClick={this.handeSubmit} color="primary">
                Send
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SubmitTicketForm;
