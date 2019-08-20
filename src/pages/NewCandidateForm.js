import React, { Component } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Box, Button } from "@material-ui/core";

export default class NewCandidateForm extends Component {
  addCandidate = () => {
    const {
      firstName,
      lastName,
      email,
      gender,
      country,
      jobTitle,
      company,
      profilePic
    } = this.state;
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      country,
      job_title: jobTitle,
      company,
      profile_pic_url: profilePic
    };
    const config = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    };
    fetch("http://localhost:3001/candidates", config).then(response => {
      if (response.ok) {
        alert("Submit successfully!");
        window.location.href = "http://localhost:3000/candidates/";
      }
    });
  };
  render() {
    return (
      <Container maxWidth="md">
        <h2>Create new candidate</h2>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          <OutlinedInput
            label="First Name"
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <OutlinedInput
            label="Last Name"
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <OutlinedInput
            label="Gender"
            onChange={e => this.setState({ gender: e.target.value })}
          />
          <OutlinedInput
            label="Job Title"
            onChange={e => this.setState({ jobTitle: e.target.value })}
          />
          <OutlinedInput
            label="Company"
            onChange={e => this.setState({ company: e.target.value })}
          />
          <OutlinedInput
            label="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <OutlinedInput
            label="Country"
            onChange={e => this.setState({ country: e.target.value })}
          />
          <OutlinedInput
            label="Profile Picture URL"
            onChange={e => this.setState({ profilePic: e.target.value })}
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.addCandidate}
        >
          Submit
        </Button>
      </Container>
    );
  }
}

function OutlinedInput(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing(1)
    },
    textField: {
      flexBasis: 200
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        id="outlined-adornment-weight"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label={props.label}
        onChange={props.onChange}
      />
    </div>
  );
}
