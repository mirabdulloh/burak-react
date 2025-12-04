// @ts-nocheck

import { log } from "node:console";
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetails = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2025,
    });
  };

  componentDidMount() {
    // runs after first render => retrieve data from back end
    console.log("componentDidMount:");
    
  }

  componentWillUnmount() {
    //runs before disappear
    console.log("componentWillUnmount:");
    
  }

  componentDidUpdate() {}
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color}- Model: {this.state.model} from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetails}>
          Change detail
        </button>
      </div>
    );
  }
}

export default Test;
