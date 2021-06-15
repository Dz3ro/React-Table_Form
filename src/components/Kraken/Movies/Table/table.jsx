import React, { Component } from "react";
import "react-dom";
import ButtonDelete from "./buttonDelete";
import ButtonLike from "./buttonLike";
import SortIcon from "./sortIcon";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  videoLike = () => {
    this.props.videoLike();
  };

  videoDelete = () => {
    this.props.videoDelete();
  };

  render() {
    const {
      onSortBy,
      onLikeVideo,
      onDeleteVideo,
      dataForDisplay,
      sortKey,
      data,
      headers,
    } = this.props;
    const tableHeaders = Object.values(headers);

    return (
      <table className="table table-hover w-75 mx-auto">
        <thead>
          <tr>
            {tableHeaders.map((x) => (
              <th scope="col" key={x} onClick={() => onSortBy(x)}>
                {x}
                <SortIcon
                  column={x}
                  sortKey={sortKey}
                  dataForDisplay={dataForDisplay}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((x) => {
            return (
              <tr key={x._id}>
                <td>
                  <Link to={`/movies/${x._id}`}>{x.title}</Link>
                </td>
                <td>{x.genre.name}</td>
                <td>{x.numberInStock}</td>
                <td>{x.dailyRentalRate}</td>
                <td>
                  <ButtonLike video={x} onLikeVideo={onLikeVideo} />
                </td>
                <td>
                  <ButtonDelete onDeleteVideo={onDeleteVideo} video={x} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
