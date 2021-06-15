import { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Joi from "joi-browser";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      error: {},
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const input = this.state.input;
    input[target.name] = target.value;
    this.setState({ input });
    this.handleValidation();
  };

  handleValidation = () => {
    const validation = Joi.validate(this.state.input, this.validationSchema, {
      abortEarly: false,
    });

    const error = this.state.error;

    for (const x in error) error[x] = null;

    if (validation.error === null) for (const x in error) error[x] = null;
    else {
      const obj = Object(validation.error.details);

      for (const det in obj) {
        const msg = obj[det]["message"];
        const path = obj[det]["path"][0];
        if (error[path] === null) error[path] = msg;
      }
    }
    this.setState({ error });
  };

  addMovie = (event) => {
    event.preventDefault();
  };

  formIsValid = () => {
    const validation = Joi.validate(
      this.state.input,
      this.validationSchema
    ).error;

    return !validation;
  };
}

export default Form;
