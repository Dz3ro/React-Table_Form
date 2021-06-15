import React, { Component } from "react";
import "react-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const moviesQuantity = this.props.moviesQuantity;
    const msgEmpty = "There are no movies in the database";
    const msgFilled = `Showing ${moviesQuantity} movies`;

    if (moviesQuantity === 0)
      return <h1 className="text-center ">{msgEmpty}</h1>;
    if (moviesQuantity === 1)
      return <h1 className="text-center ">{msgFilled.slice(0, -1)}</h1>;
    return <h1 className="text-center ">{msgFilled}</h1>;
  }
}

export default Header;
