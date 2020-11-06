import { Component } from "react";
import "./App.css";
import Subject from "./component/Subject";
import TOC from "./component/TOC";
import Control from "./component/Control";
import CreateContent from "./component/CreateContent";
import UpdateContent from "./component/UpdateContent";
import ReadContent from "./component/ReadContent";

class App extends Component {
  state = {
    mode: "welcome",
    selected_content_id: 1,
    subject: { title: "WEB", sub: "Biio's practice web" },
    welcome: { title: "Welcome", desc: "Hello, React!" },
    contents: [
      { id: 1, title: "HTML", desc: "HTML is HyperTexk Markup Language." },
      { id: 2, title: "CSS", desc: "CSS is for design" },
      { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
    ],
  };

  changeMode(modeState) {
    this.setState({ mode: modeState });
  }

  // 다른 content로 이동
  changeReadContent(content_id) {
    this.setState({ selected_content_id: content_id });
  }

  // 현재 content 가져오기
  getReadContent() {
    const { contents, selected_content_id } = this.state;
    return contents.find(content => content.id === selected_content_id);
  }

  // 쓰기, 수정, 삭제 버튼 활성화
  btnEvent(e) {
    const selectedBtn = e.target.dataset.btn;
    this.changeMode(selectedBtn);
  }

  createSubmit(title, desc) {
    const { contents } = this.state;
    const content_id = this.state.contents.length + 1;
    const content = { id: content_id, title, desc };
    const _contents = contents.concat(content);
    this.setState({
      mode: "read",
      selected_content_id: content_id,
      contents: _contents,
    });
  }

  UpdateSubmit(id, title, desc) {
    const { contents } = this.state;
    const content = { id, title, desc };
    const _contents = Array.from(contents);
    _contents.splice(id - 1, 1, content);
    console.log(_contents);
    this.setState({ mode: "read", contents: _contents });
  }

  deleteContent() {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const { contents, selected_content_id } = this.state;
      const _contents = Array.from(contents);
      const _content = this.getReadContent();
      const _id = _content.id;
      _contents.splice(_id - 1, 1);
      _contents.forEach((content, i) => (content.id = i + 1));
      this.setState({
        contents: _contents,
        selected_content_id:
          selected_content_id < contents.length
            ? selected_content_id
            : selected_content_id - 1,
      });
    }
  }

  // mode에 따라 다른 content 표시
  getContent() {
    const { mode, welcome } = this.state;
    let _title = null;
    let _desc = null;
    let _article = null;

    if (mode === "welcome") {
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (mode === "read") {
      const selected_content = this.getReadContent();
      _title = selected_content.title;
      _desc = selected_content.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (mode === "create") {
      _article = (
        <CreateContent
          onSubmit={(title, desc) => {
            this.createSubmit(title, desc);
          }}
        />
      );
    } else if (mode === "update") {
      const selected_content = this.getReadContent();
      _article = (
        <UpdateContent
          data={selected_content}
          onSubmit={(id, title, desc) => {
            this.UpdateSubmit(id, title, desc);
          }}
        />
      );
    }
    return _article;
  }

  render() {
    const { subject, contents } = this.state;

    return (
      <div className="App">
        <header>
          <Subject
            title={subject.title}
            sub={subject.sub}
            onChangePage={() => this.changeMode("welcome")}
          />
          <nav>
            <ul>
              {contents.map(content => (
                <TOC
                  key={content.id}
                  list={content.title}
                  onChangePage={() => {
                    this.changeMode("read");
                    this.changeReadContent(content.id);
                  }}
                />
              ))}
            </ul>
          </nav>
        </header>
        <Control
          onChangeMode={e => this.btnEvent(e)}
          onDelete={() => this.deleteContent()}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
