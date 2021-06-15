import "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Joi from "joi-browser";
import Form from "./form";
import InputWithLabel from "./inputWithLabel";

class Register extends Form {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        username: "",
        email: "",
        password: "",
      },
      error: {
        username: null,
        email: null,
        password: null,
      },
    };
  }

  validationSchema = Joi.object({
    username: Joi.string()
      .min(5)
      .max(20)
      .required()
      .alphanum()
      .label("Username")
      .error((e) => this.errorMsgCustomize(e)),

    password: Joi.string()
      .min(8)
      .required()
      .label("Password")
      .error((e) => this.errorMsgCustomize(e)),
    email: Joi.string()
      .email()
      .label("Email")
      .error((e) => this.errorMsgCustomize(e)),
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
    });
    return errors;
  };

  addMovie = (event) => {
    event.preventDefault();
    console.log("submitting");
  };

  render() {
    const { username, email, password } = this.state.input;
    const { error } = this.state;

    return (
      <form className="w-25 m-5">
        <InputWithLabel
          onInputChange={this.handleInputChange}
          name="username"
          value={username}
          id="inputUsername"
          type="text"
          labelText="Username"
          error={error.username}
        />
        <InputWithLabel
          onInputChange={this.handleInputChange}
          name="email"
          value={email}
          id="inputEmail"
          type="email"
          labelText="Email"
          error={error.email}
        />
        <InputWithLabel
          onInputChange={this.handleInputChange}
          name="password"
          value={password}
          id="inputPassword"
          type="password"
          labelText="Password"
          error={error.password}
        />

        <button
          onClick={this.addMovie}
          type="submit"
          className="btn btn-primary"
          disabled={!this.formIsValid()}
        >
          Register
        </button>
      </form>
    );
  }
}

export default Register;
