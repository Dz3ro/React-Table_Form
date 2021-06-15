import React, { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";

class GenreList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onGenreChange(genreId) {
    this.props.table.genreChange(genreId);
  }

  render() {
    const { genreSelected, genreChange, genresList } = this.props;

    return (
      <ul className="list-group">
        <li
          onClick={() => genreChange(null)}
          className={
            !genreSelected ? "list-group-item active" : "list-group-item"
          }
        >
          All Genres
        </li>
        {genresList.map((item) => (
          <li
            key={item._id}
            id={item._id}
            onClick={() => genreChange(item._id)}
            className={
              genreSelected && genreSelected._id === item._id
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default GenreList;
