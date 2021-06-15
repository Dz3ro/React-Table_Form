import React, { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import * as database from "../fakeMovieService";
import Pagination from "./Table/pagination";
import GenreList from "./Table/genreList";
import { getGenres } from "../fakeGenreService";
import Header from "./header";
import Table from "./Table/table";
import { Link } from "react-router-dom";
import InputWithPlaceholder from "../Register/InputWithPlaceholder";

class MainMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      moviesPerPage: 4,
      currentPage: 1,
      genres: null,
      genreSelected: null,
      searchInput: "",
      dataForDisplay: null,
      sortKey: { column: null, direction: 1 },
    };
  }

  componentDidMount() {
    const movies = database.getMovies();
    const genres = getGenres();
    const dataForDisplay = {
      title: "Title",
      genre: "Genre",
      numberInStock: "Stock",
      dailyRentalRate: "rate",
    };

    this.setState({ movies, genres, dataForDisplay });
  }

  videoDelete = (movie) => {
    const { movies, moviesPerPage, currentPage } = this.state;
    const newList = movies.filter((x) => x._id !== movie._id);

    // this part of code checks if after delete display list will be empty to go back 1 page
    const filteredLength = this.__getFilteredMoviesByGenre().length - 1;
    const pagesNeeded = Math.ceil(filteredLength / moviesPerPage);

    const needToGoBack = currentPage > pagesNeeded;
    //////
    if (needToGoBack)
      this.setState({
        movies: newList,
        currentPage: this.state.currentPage - 1,
      });
    else this.setState({ movies: newList });
  };

  videoLike = (movie) => {
    const movies = this.state.movies;
    const movieToEdit = movies.find((x) => x._id === movie._id);
    movieToEdit.liked = !movieToEdit.liked;
    this.setState({ movies: movies });
  };

  pageChange = (page) => {
    this.setState({ currentPage: page });
  };

  genreChange = (genreId) => {
    let genre = null;
    if (genreId) genre = this.state.genres.find((x) => x._id === genreId);
    this.setState({ genreSelected: genre, currentPage: 1 });
  };

  dataSort = (sortByColumnName) => {
    let { dataForDisplay, sortKey } = this.state;
    const key = Object.keys(dataForDisplay).find(
      (key) => dataForDisplay[key] === sortByColumnName
    );
    sortKey.column = key;
    sortKey.direction *= -1;
    this.setState({ sortKey: sortKey });
  };

  handlesSearchInput = (event) => {
    const searchInput = event.target.value;
    const genreSelected = null;
    this.setState({ searchInput, genreSelected });
  };

  __getFilteredMoviesBySearchBox(movies) {
    const search = this.state.searchInput.toLowerCase();
    const filtered = movies.filter((x) =>
      x.title.toLowerCase().includes(search)
    );
    return filtered;
  }

  __getFilteredMoviesByGenre() {
    let { movies, genreSelected } = this.state;

    if (!genreSelected) return movies;

    const moviesFiltered = movies.filter(
      (x) => x.genre._id === genreSelected._id
    );
    return moviesFiltered;
  }

  __getMoviesForCurrentPage(moviesProvided) {
    const { currentPage, moviesPerPage, movies } = this.state;
    const firstIndex = (currentPage - 1) * moviesPerPage;
    let lastIndex = firstIndex + moviesPerPage - 1;
    lastIndex = lastIndex > movies.length - 1 ? movies.length - 1 : lastIndex;
    const moviesToRender = moviesProvided.slice(firstIndex, lastIndex + 1);
    return moviesToRender;
  }

  __sortData(data) {
    const sortKey = this.state.sortKey;
    let col = sortKey.column;
    const dir = sortKey.direction;

    data.sort((x, y) => {
      //this part is when the sorting value is an obj so we need to extract 1st value from that obj
      if (typeof x[col] === "object") {
        const keyName = Object.keys(x[col])[0];

        const xVal = x[col][keyName];
        const yVal = y[col][keyName];

        if (xVal > yVal) return dir;
        if (xVal < yVal) return -dir;
        return 0;
      }

      if (x[col] > y[col]) return dir;
      if (x[col] < y[col]) return -dir;
      return 0;
    });
  }

  render() {
    const {
      movies,
      genres,
      searchInput,
      genreSelected,
      sortKey,
      dataForDisplay,
      currentPage,
      moviesPerPage,
    } = this.state;

    if (!movies || !genres) return null;

    const moviesFiltered = this.__getFilteredMoviesByGenre();
    const MoviesFilteredWithSearch =
      this.__getFilteredMoviesBySearchBox(moviesFiltered);
    this.__sortData(MoviesFilteredWithSearch);
    const finalListForPage = this.__getMoviesForCurrentPage(
      MoviesFilteredWithSearch
    );

    return (
      <div>
        <div className="d-flex justify-content-center">
          <Link to="/movies/add" className="btn btn-primary  m-5">
            Add Movie
          </Link>
        </div>
        <div className="row">
          <div className="col-2">
            <GenreList
              genresList={getGenres()}
              genreChange={this.genreChange}
              genreSelected={genreSelected}
            />
          </div>
          <div className="col">
            <Header moviesQuantity={MoviesFilteredWithSearch.length} />
            <InputWithPlaceholder
              value={searchInput}
              onInputChange={this.handlesSearchInput}
            />
            <Table
              headers={this.state.dataForDisplay}
              data={finalListForPage}
              onLikeVideo={this.videoLike}
              onDeleteVideo={this.videoDelete}
              onSortBy={this.dataSort}
              sortKey={sortKey}
              dataForDisplay={dataForDisplay}
            />
            <Pagination
              table={this}
              moviesQuantity={moviesFiltered.length}
              currentPage={currentPage}
              moviesPerPage={moviesPerPage}
              onPageChange={this.pageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainMovies;
