import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import "./App.css";
import CandidatesPage from "./pages/CandidatesPage";
import Candidate from "./pages/Candidate";
import EditCandidate from "./pages/EditCandidate";
import NewCandidateForm from "./pages/NewCandidateForm";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
    color: "#e3f2fd"
  }
}));
function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} align="left">
                JOBSeek
              </Typography>
              <Button className={classes.button} href="/">
                Home
              </Button>
              <Button className={classes.button} href="/about/">
                About
              </Button>
              <Button className={classes.button} href="/candidates/">
                Candidates
              </Button>
              <Button
                variant="contained"
                color="secondary"
                href="/add-candidates/"
              >
                New Candidate
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/candidates/" exact component={CandidatesPage} />
          <Route path="/add-candidates/" component={NewCandidateForm} />
          <Route
            path="/candidates/:id/"
            exact
            render={props => <Candidate {...props} />}
          />

          <Route
            path="/candidates/:id/edit/"
            render={props => <EditCandidate {...props} />}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
