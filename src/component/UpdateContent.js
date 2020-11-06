import { Component } from "react";

class UpdateContent extends Component {
  state = {
    id: this.props.data.id,
    title: this.props.data.title,
    desc: this.props.data.desc,
  };

  inputFromHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // 객체 안에 key를 []로 감싸면 그 안에 있는 레퍼런스의 실제값이 key로 사용!:)

  render() {
    const { props, state } = this;
    return (
      <article>
        <form
          action="/create_process"
          method="post"
          onSubmit={e => {
            e.preventDefault();
            props.onSubmit(state.id, state.title, state.desc);
          }}
        >
          <input type="hidden" name="id" value={state.id} />
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요"
            value={state.title}
            onChange={e => this.inputFromHandler(e)}
          />
          <textarea
            name="desc"
            placeholder="내용을 입력해주세요"
            value={state.desc}
            onChange={e => this.inputFromHandler(e)}
            cols="30"
            rows="10"
          ></textarea>
          <input type="submit" value="제출하기" />
        </form>
      </article>
    );
  }
}

export default UpdateContent;
