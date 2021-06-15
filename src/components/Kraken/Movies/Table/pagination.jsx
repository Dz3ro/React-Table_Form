import React, { Component } from "react";
import "react-dom";
import "bootstrap/dist/css/bootstrap.css";

class Pagination extends Component {
  get pagesAmountNeeded() {
    const { moviesQuantity, moviesPerPage } = this.props;
    const amount = Math.ceil(moviesQuantity / moviesPerPage);
    return amount;
  }

  get paginationButtons() {
    let pages = [];
    for (let i = 1; i <= this.pagesAmountNeeded; i++) pages.push(i);
    return pages;
  }
  render() {
    const paginationButtons = this.paginationButtons;
    const { currentPage, onPageChange } = this.props;

    if (this.props.moviesQuantity <= this.props.moviesPerPage) return null;

    return (
      <nav aria-label="Page navigation example" className="mx-auto">
        <ul className="pagination mx-auto justify-content-center">
          <li className="page-item">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={
                this.props.currentPage > 1
                  ? "page-link"
                  : "page-link btn disabled"
              }
            >
              Previous
            </button>
          </li>
          {paginationButtons.map((x) => (
            <li
              className={x === currentPage ? "page-item active" : "page-item"}
              key={x}
            >
              <button className="page-link" onClick={() => onPageChange(x)}>
                {x}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={
                currentPage < paginationButtons.length
                  ? "page-link"
                  : "page-link btn disabled"
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
