import React, { Component } from "react";
import "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

class SortIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //this part of code comparing it name to dataForDIsplay checks what key it belongs to
    const sortedColumn = this.props.sortKey.column;
    const column = this.props.column;
    const data = this.props.dataForDisplay;
    const colKey = Object.keys(data).find((x) => data[x] === column);
    ///
    if (sortedColumn !== colKey) return null;

    if (this.props.sortKey.direction === 1)
      return <FontAwesomeIcon size="1x" icon={faSortUp} />;

    return <FontAwesomeIcon size="1x" icon={faSortDown} />;
  }
}

export default SortIcon;
