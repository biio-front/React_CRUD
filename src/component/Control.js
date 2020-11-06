import React from "react";

function Control(props) {
  return (
    <div className="btn">
      <ul
        onClick={e => {
          e.preventDefault();
          props.onChangeMode(e);
        }}
      >
        <li>
          <a href="/create" data-btn="create">
            Create
          </a>
        </li>
        <li>
          <a href="/update" data-btn="update">
            Update
          </a>
        </li>
        <li>
          <button data-btn="read" onClick={props.onDelete}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Control;
