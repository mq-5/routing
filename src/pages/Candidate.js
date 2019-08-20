import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

export default class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = { done: false };
  }
  async componentDidMount() {
    let response = await fetch(
      `http://localhost:3001/candidates/${this.props.match.params.id}`
    );
    let data = await response.json();
    this.setState({ info: data, done: true });
  }
  render() {
    return <>{this.state.done && <MiddleDividers info={this.state.info} />}</>;
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto"
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  }
}));

function MiddleDividers(props) {
  const classes = useStyles();
  let info = props.info;
  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {info.first_name} {info.last_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                #{info.id}
              </Typography>
            </Grid>
          </Grid>
          <Typography gutterBottom variant="h6">
            {info.company}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {info.gender}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {info.job_title}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {info.email}
          </Typography>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="h6">
            {info.country}
          </Typography>
          <div>
            {info.locations &&
              info.locations.map(location => {
                return <Chip className={classes.chip} label={location.city} />;
              })}
          </div>
        </div>
        <div className={classes.section3}>
          <Button color="primary" href={`/candidates/${info.id}/edit/`}>
            Edit
          </Button>
        </div>
      </div>
    </Container>
  );
}
