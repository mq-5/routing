import React, { Component } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Box, Button, MenuItem, Snackbar } from "@material-ui/core";

export default class EditCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = { success: false };
  }

  async componentDidMount() {
    let response = await fetch(
      `http://localhost:3001/candidates/${this.props.match.params.id}`
    );
    let data = await response.json();
    this.setState({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      gender: data.gender,
      country: data.country,
      jobTitle: data.job_title,
      company: data.company,
      profilePic: data.profile_pic_url
    });
  }

  editProfile = async () => {
    const {
      email,
      gender,
      country,
      lastName,
      jobTitle,
      firstName,
      company,
      profilePic
    } = this.state;
    const data = {
      email: email,
      gender: gender,
      country: country,
      company: company,
      last_name: lastName,
      job_title: jobTitle,
      first_name: firstName,
      profile_pic_url: profilePic
    };
    const config = {
      method: "PATCH",
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
    let response = await fetch(
      `http://localhost:3001/candidates/${this.props.match.params.id}`,
      config
    );
    if (response.status === 200) {
      this.setState({ success: true });
      setTimeout(() => this.setState({ success: false }), 3000);
      window.location.href = "http://localhost:3000/candidates/";
    }
  };

  render() {
    console.log(this.state);
    return (
      <Container maxWidth="md">
        <h2 color="blue">Edit Profile</h2>
        <SuccessMessage open={this.state.success} />
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          <OutlinedInput
            label="First Name"
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <OutlinedInput
            label="Last Name"
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <OutlinedInput
            label="Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <SelectInput
            label="Gender"
            value={this.state.gender}
            onChange={e => this.setState({ gender: e.target.value })}
          />
          <OutlinedInput
            label="Job Title"
            value={this.state.jobTitle}
            onChange={e => this.setState({ jobTitle: e.target.value })}
          />
          <OutlinedInput
            label="Company"
            value={this.state.company}
            onChange={e => this.setState({ company: e.target.value })}
          />
          <OutlinedInput
            label="Country"
            value={this.state.country}
            onChange={e => this.setState({ country: e.target.value })}
          />
          <OutlinedInput
            label="Profile Picture"
            value={this.state.profile_pic_url}
            onChange={e => this.setState({ profilePic: e.target.value })}
          />
        </Box>
        <Button
          color="secondary"
          variant="contained"
          onClick={this.editProfile}
        >
          Submit
        </Button>
      </Container>
    );
  }
}

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

function OutlinedInput(props) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" className="edit-input">
      <label>{props.label}</label>
      <TextField
        className={classes.textField}
        value={props.value}
        onChange={props.onChange}
      />
    </Box>
  );
}
const ranges = [
  {
    value: "Female",
    label: "Female"
  },
  {
    value: "Male",
    label: "Male"
  }
];

function SelectInput(props) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" className="edit-input">
      <label>Gender</label>
      <TextField
        select
        value={props.value}
        onChange={props.onChange}
        className={classes.textField}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

function SuccessMessage(props) {
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center"
  });

  const { vertical, horizontal } = state;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={props.open}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Edit successful!</span>}
      />
    </div>
  );
}
