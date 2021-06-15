import { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onInputChange, name, value, id, type, labelText, error } =
      this.props;
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {labelText}
        </label>
        <input
          type={type}
          className="form-control"
          id={id}
          onChange={onInputChange}
          name={name}
          value={value}
        />

        {error && <div className="alert alert-danger ">{error}</div>}
      </div>
    );
  }
}

export default InputWithLabel;
