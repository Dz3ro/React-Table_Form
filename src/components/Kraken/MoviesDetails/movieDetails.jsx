import { Component } from "react";
import "react-dom";
import {} from "query-string";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Save = () => {
    this.props.history.push("/movies");
  };

  render() {
    const movieId = this.props.match.params.id;

    return (
      <div>
        <h1>Movie {movieId}</h1>
        <button
          onClick={() => this.Save()}
          type="button"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
