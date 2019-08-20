import React, { Component } from "react";
import { Container } from "@material-ui/core";

export default class Candidate extends Component {
  render() {
    console.log("PROPS", this.props);
    return (
      <Container>
        <h2>Hello</h2>
      </Container>
    );
  }
}
