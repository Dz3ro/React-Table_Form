import React, { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as thumbsSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as thumbsReg } from "@fortawesome/free-regular-svg-icons";

class ButtonLike extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { video, onLikeVideo } = this.props;
    if (!this.props.video.liked)
      return (
        <FontAwesomeIcon
          onClick={() => onLikeVideo(video)}
          color="dodgerblue"
          size="2x"
          icon={thumbsReg}
        />
      );

    return (
      <FontAwesomeIcon
        onClick={() => onLikeVideo(video)}
        color="dodgerblue"
        size="2x"
        icon={thumbsSolid}
      />
    );
  }
}

export default ButtonLike;
