/* eslint-disable */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";

//Deployment on heroku
const API_BASE = "https://obscure-lowlands-39844.herokuapp.com/";

//Local host
//const API_BASE = "http://localhost:8000/";

class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      schedule: [],
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      validEmail: true,
      validPhone: true,
      finished: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0
    };
  }

  componentDidMount() {
    axios.get(API_BASE + '').then(response => {
      console.log("response via db: ", response.data);
      this.handleDBResponse(response.data);
    });
  }

  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date, confirmationTextVisible: true });
  }

  handleSetAppointmentSlot(slot) {
    this.setState({ appointmentSlot: slot });
  }

  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem });
  }

  handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      appointment_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      appointment_time: this.state.appointmentSlot
    };
    axios
      .post(API_BASE + "bookAppointment", newAppointment)
      .then(response =>
        this.setState({
          confirmationSnackbarMessage: "Appointment successfully added!",
          confirmationSnackbarOpen: true,
          processed: true
        })
      )
      .catch(err => {
        console.log(err);
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true
        });
    });
    axios
      .post(API_BASE + "confirmationEmail", newAppointment)
      .then(response => 
        console.log("email sent successfully!")
        )
      .catch(err => {
        console.log(err)
      })
  }
  
  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email)
      ? this.setState({ email: email, validEmail: true })
      : this.setState({ validEmail: false });
  }

  validatePhone(phoneNumber) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phoneNumber)
      ? this.setState({ phone: phoneNumber, validPhone: true })
      : this.setState({ validPhone: false });
  }

  checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day)
        .startOf("day")
        .diff(moment().startOf("day")) < 0
    );
  }

  handleDBResponse(response) {
    const appointments = response;
    const today = moment().startOf("day"); //start of today 12 am
    const initialSchedule = {};
    initialSchedule[today.format("YYYY-DD-MM")] = true;
    const schedule = !appointments.length
      ? initialSchedule
      : appointments.reduce((currentSchedule, appointment) => {
          const { appointment_date, appointment_time } = appointment;
          const dateString = moment(appointment_date, "YYYY-DD-MM").format(
            "YYYY-DD-MM"
          );
          !currentSchedule[appointment_date] ? (currentSchedule[dateString] = Array(8).fill(false)) : null;
          Array.isArray(currentSchedule[dateString])
            ? (currentSchedule[dateString][appointment_time] = true)
            : null;
          return currentSchedule;
        }, initialSchedule);

    for (let day in schedule) {
      let slots = schedule[day];
      slots.length
        ? slots.every(slot => slot === true) ? (schedule[day] = true) : null
        : null;
    }

    this.setState({
      schedule: schedule
    });
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C853" };
    return (
      <section>
        <DialogTitle>
          {"Confirm your appointment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>
        <p>
          Email: <span style={spanStyle}>{this.state.email}</span>
        </p>
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format(
              "dddd[,] MMMM Do[,] YYYY"
            )}
          </span>{" "}
          at{" "}
          <span style={spanStyle}>
            {moment()
              .hour(8)
              .minute(0)
              .add(this.state.appointmentSlot, "hours")
              .format("h:mm a")}
          </span>
        </p>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
        onClick={() => this.setState({ confirmationModalOpen: false })}
          >Cancel</Button>
        <Button
        variant="contained"
        color="primary"
        onClick={() => this.handleSubmit()}
        style={{ marginLeft: 12 }}
        >Confirm</Button>
        </DialogActions>
      </section>
    );
  }

  renderAppointmentTimes() {
    if (!this.state.isLoading) {
      const slots = [...Array(8).keys()];
      return slots.map(slot => {
        const appointmentDateString = moment(this.state.appointmentDate).format(
          "YYYY-DD-MM"
        );
        const time1 = moment()
          .hour(8)
          .minute(0)
          .add(slot, "hours");
        const time2 = moment()
          .hour(8)
          .minute(0)
          .add(slot + 1, "hours");
        const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
              moment(this.state.appointmentDate).format("YYYY-DD-MM")
            ][slot]
          : false;
        const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
  
        return (
          <RadioButton
            label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
            key={slot}
            value={slot}
            style={{
              marginBottom: 15,
              display: meridiemDisabled ? "none" : "inherit"
            }}
            disabled={scheduleDisabled || meridiemDisabled}
          />
        );
      });
    } else {
      return null;
    }
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: "12px 0" }}>
        {step > 0 && (
          <Button
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
          > Back </Button>
        )}
        <Button
          label={stepIndex === 2 ? "Finish" : "Next"}
          variant="contained"
          color="primary"
          onClick={this.handleNext}
          style={{ marginLeft: 12 }}
        > { stepIndex === 2? "Finish" : "Next" } </Button>
      </div>
    );
  }


  render() {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;

    const contactFormFilled =
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.email &&
      data.validPhone &&
      data.validEmail;

    const DatePickerExampleSimple = () => (
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={day => this.checkDisableDate(day)} 
        />
    );

    const modalActions = [
      <Button
        onClick={() => this.setState({ confirmationModalOpen: false })}
      >Cancel</Button>,
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.handleSubmit()}
        style={{ marginLeft: 12 }}
      >Confirm</Button>
    ];
    return (
      <div> 
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0
          }}
        >
          <Card
            style={{
              margin: "100px 10px 10px 10px",
              padding: "12px 12px 25px 12px",
              height: smallScreen ? "100vh" : null
            }}
          >
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear="false"
            >
              <Step>
                <StepLabel>
                  Choose an available day for your appointment
                </StepLabel>
                <StepContent>
                  {DatePickerExampleSimple()}
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  Choose an available time for your appointment
                </StepLabel>
                <StepContent>
                  <SelectField
                    floatingLabelText="AM/PM"
                    value={data.appointmentMeridiem}
                    onChange={(evt, key, payload) =>
                      this.handleSetAppointmentMeridiem(payload)
                    }
                    selectionRenderer={value => (value ? "PM" : "AM")}
                  >
                    <MenuItem value={0} primaryText="AM" />
                    <MenuItem value={1} primaryText="PM" />
                  </SelectField>
                  <RadioButtonGroup
                    style={{
                      marginTop: 15,
                      marginLeft: 15
                    }}
                    name="appointmentTimes"
                    defaultSelected={data.appointmentSlot}
                    onChange={(evt, val) => this.handleSetAppointmentSlot(val)}
                  >
                    {this.renderAppointmentTimes()}
                  </RadioButtonGroup>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  Share your contact information with us and we'll send you a
                  reminder
                </StepLabel>
                <StepContent>
                  <p>
                    <section>
                      <TextField
                        id="standard-basic"
                        label="First Name"
                        style={{ display: "block" }}
                        name="first_name"
                        hintText="First Name"
                        onChange={(evt, newValue) =>
                        this.setState({ firstName: newValue })
                        }
                      />
                      <br/>
                      <TextField
                        id="standard-basic"
                        label="Last Name"
                        style={{ display: "block" }}
                        name="last_name"
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        onChange={(evt, newValue) =>
                          this.setState({ lastName: newValue })
                        }
                      />
                      <br/>
                      <TextField
                        id="standard-basic"
                        label="Email"
                        style={{ display: "block" }}
                        name="email"
                        hintText="youraddress@mail.com"
                        floatingLabelText="Email"
                        errorText={
                          data.validEmail ? null : "Enter a valid email address"
                        } 
                        onChange={(evt, newValue) =>
                          this.validateEmail(newValue)
                        }
                      />
                       <br/>

                      <TextField
                        id="standard-basic"
                        label="Phone"
                        style={{ display: "block" }}
                        name="phone"
                        hintText="+2348995989"
                        floatingLabelText="Phone"
                        errorText={
                          data.validPhone ? null : "Enter a valid phone number"
                        }
                        onChange={(evt, newValue) =>
                          this.validatePhone(newValue)
                        }
                      />
                      <br/>

                      <Button
                        style={{ display: "block" }}
                        labelPosition="before"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={() =>
                          this.setState({
                            confirmationModalOpen: !this.state
                              .confirmationModalOpen
                          })
                        }
                        disabled={!contactFormFilled || data.processed}
                      >{contactFormFilled
                      ? "Schedule"
                      : "Fill out your information to schedule"}</Button>
                    </section>
                  </p>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            title="Confirm your appointment"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth="400px"
          >
            {this.renderAppointmentConfirmation()}
          </Dialog>
          <SnackBar
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            open = {confirmationSnackbarOpen }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />
        </section>
      </div>
    );
  }
}
export default AppointmentApp;