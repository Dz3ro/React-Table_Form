import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import "react-dom";

class ButtonDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDeleteVideo(this.props.video)}
      >
        DELETE
      </button>
    );
  }
}

export default ButtonDelete;
