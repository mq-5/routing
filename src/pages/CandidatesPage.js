import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default class CandidatesPage extends Component {
  state = { candidates: [] };
  async componentDidMount() {
    const response = await fetch("http://localhost:3001/candidates");
    const data = await response.json();
    console.log("Candidates", data);
    this.setState({ candidates: data });
  }

  render() {
    return (
      <div className="candidates">
        {this.state.candidates.slice(0, 100).map(candidate => {
          return (
            <Card className="card" style={{ width: 250, margin: "1rem   " }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={candidate.profile_pic_url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h4">
                    {candidate.first_name} {candidate.last_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    ID: {candidate.id}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions align="center">
                <Button
                  size="small"
                  color="primary"
                  href={`/candidates/${candidate.id}/edit/`}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  href={`/candidates/${candidate.id}/`}
                >
                  More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }
}
