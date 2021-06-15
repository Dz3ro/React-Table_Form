import { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";

class InputSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { id, options, onInputChange, name, genreSelected } = this.props;

    return (
      <div className="mb-3">
        <select
          className="form-control"
          id={id}
          name={name}
          onChange={onInputChange}
        >
          <option></option>
          {options.map((x) => {
            if (genreSelected === x.name)
              return (
                <option key={x._id} selected>
                  {x.name}
                </option>
              );
            return <option key={x._id}>{x.name}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default InputSelect;
