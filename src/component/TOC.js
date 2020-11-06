import React from "react";

function TOC(props) {
  return (
    <li>
      <a
        href={`/content/${props.id}`}
        onClick={e => {
          e.preventDefault();
          props.onChangePage();
        }}
      >
        {props.list}
      </a>
    </li>
  );
}

export default TOC;
