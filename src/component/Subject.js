import React from "react";

function Subject(props) {
  return (
    <div className="header">
      <h1>
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            props.onChangePage();
          }}
        >
          {props.title}
        </a>
      </h1>
      <p>{props.sub}</p>
    </div>
  );
}

export default Subject;
