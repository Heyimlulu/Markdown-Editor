import React, { Component } from "react";
import "./App.css";
import { sampleText } from "./sampleText";
import marked from "marked";

class App extends Component {
  state = {
    text: sampleText,
    copySuccess: "Copy to clipboard"
  };

  componentDidMount() {
    const text = localStorage.getItem("text");

    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate() {
    const text = this.state.text;
    localStorage.setItem("text", text);
  }

  handleChange = (event) => {
    const text = event.target.value;
    this.setState({ text });
  };

  renderText = (text) => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };

  clipboard = () => {
    this.setState({ copySuccess: "Copied!" });
    navigator.clipboard.writeText(this.state.text);
    setTimeout(() => {
      this.setState({ copySuccess: "Copy to clipboard" });
    }, 2000);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              rows="35"
              className="form-control"
              value={this.state.text}
              onChange={this.handleChange}
            ></textarea>
            <button
              className="btn btn-primary mt-2 w-100"
              onClick={this.clipboard}
            >
              {this.state.copySuccess}
            </button>
          </div>
          <div className="col-sm-6">
            <div>
              <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
