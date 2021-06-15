import "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Joi from "joi-browser";
import Form from "../Register/form";
import InputWithPlaceholder from "../Register/InputWithPlaceholder";
import InputSelect from "../Register/inputSelect";
import { getGenres } from "../fakeGenreService";
import { getMovie, saveMovie } from "../fakeMovieService";

class MoviesAddForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        title: "",
        genre: "",
        stock: "",
        rate: "",
      },
      error: {
        title: null,
        stock: null,
        rate: null,
      },
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;
    if (movieId === null || movieId === undefined) return;

    const movie = getMovie(movieId);

    if (movie === null || movie === undefined) {
      this.props.history.replace("/not-found");
      return;
    }

    console.log(movie);

    let input = this.state.input;
    input.title = movie.title;
    input.genre = movie.genre.name;
    input.stock = movie.numberInStock;
    input.rate = movie.dailyRentalRate;

    this.setState({ input });
    this.handleValidation();
  }

  validationSchema = Joi.object({
    title: Joi.string()
      .min(1)
      .max(20)
      .required()
      .label("Title")
      .error((e) => this.errorMsgCustomize(e)),

    stock: Joi.number()
      .min(0)
      .required()
      .label("Stock")
      .error((e) => this.errorMsgCustomize(e)),
    rate: Joi.number()
      .min(0)
      .max(10)
      .label("Rate")
      .error((e) => this.errorMsgCustomize(e)),
    genre: Joi.string().required(),
  });

  errorMsgCustomize = (errors) => {
    errors.forEach((e) => {
      const c = e.context;
      if (e.type === "any.empty") e.message = `${c.label} can't be empty`;
      else if (e.type === "string.min")
        e.message = `${c.label} must have at least ${c.limit} characters`;
      else if (e.type === "string.alphanum")
        e.message = `${c.label} can't contain any special signs`;
      else if (e.type === "string.email")
        e.message = "Please input a valid email";
      else if (e.type === "number.min")
        e.message = `Number can't be lower than ${c.limit}`;
      else if (e.type === "number.max")
        e.message = `Number can't be higher than ${c.limit}`;
    });
    return errors;
  };

  addMovie = (event) => {
    event.preventDefault();
    const movie = {};
    const input = this.state.input;
    movie.title = input.title;
    movie.numberInStock = input.stock;
    movie.dailyRentalRate = input.rate;
    const movieId = this.props.match.params.id;
    movie._id = movieId;

    const genre = getGenres().find((x) => x.name === input.genre);
    movie.genre = genre;
    saveMovie(movie);
    this.props.history.push("/movies");
  };

  render() {
    const { title, stock, rate, genre } = this.state.input;
    const error = this.state.error;
    const genres = getGenres();

    return (
      <form className="w-25 m-5">
        <InputWithPlaceholder
          onInputChange={this.handleInputChange}
          name="title"
          value={title}
          id="inputTitle"
          type="text"
          labelText="Title"
          error={error.title}
        />
        <InputSelect
          onInputChange={this.handleInputChange}
          id="inputGenre"
          placeholder="Genre"
          options={genres}
          name="genre"
          genreSelected={genre}
        />
        <InputWithPlaceholder
          onInputChange={this.handleInputChange}
          name="stock"
          value={stock}
          id="inputStock"
          type="number"
          labelText="Stock"
          error={error.stock}
        />
        <InputWithPlaceholder
          onInputChange={this.handleInputChange}
          name="rate"
          value={rate}
          id="inputRate"
          type="number"
          labelText="Rate"
          error={error.rate}
        />

        <button
          onClick={this.addMovie}
          type="submit"
          className="btn btn-primary"
          disabled={!this.formIsValid()}
        >
          Add Movie
        </button>
      </form>
    );
  }
}

export default MoviesAddForm;
