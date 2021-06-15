import React, { Component } from "react";
import "react-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./navBar";
import Customers from "./Customers/cutomers";
import Movies from "./Movies/mainMovies";
import MoviesAddForm from "./MoviesAdd/moviesAddForm";
import Rentals from "./Rentals/rentals";
import Register from "./Register/register";
import Home from "./Home/home";
import NotFound from "./NotFound/notFound";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/movies/add" component={MoviesAddForm} />
          <Route path="/movies/:id" component={MoviesAddForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
