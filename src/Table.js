import React from "react";
import "./Table.css";

function Table(props) {
  return (
    <div className="table">
      <div className="table_heading">
        <tr>
          <td>STATE/UT</td>
          <td>CONFIRMED</td>
          <td>ACTIVE</td>
          <td>RECOVERED</td>
          <td>DEATHS</td>
        </tr>
      </div>
      <div className="table_stats">
        {props.states.map((x, index) => (
          <tr
            key={index}
            value={index}
            onMouseOver={() => {
              props.onSelect(index);
            }}
          >
            <td>{x.state}</td>
            <td>{x.confirmed}</td>
            <td>{x.active}</td>
            <td>{x.recovered}</td>
            <td>{x.deaths}</td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Table;
