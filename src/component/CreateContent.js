import React from "react";

function CreateContent(props) {
  return (
    <article>
      <form
        action="/create_process"
        method="post"
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit(e.target.title.value, e.target.desc.value);
          console.log("submit!!!!!");
        }}
      >
        {/* methode가 psot방식으로 가야 url에 노출이 안됨. */}
        <input type="text" name="title" placeholder="제목을 입력해주세요" />
        <textarea
          name="desc"
          placeholder="내용을 입력해주세요"
          cols="30"
          rows="10"
        ></textarea>
        <input type="submit" value="제출하기" />
      </form>
    </article>
  );
}

export default CreateContent;
