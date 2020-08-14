import React, { Component } from "react";
import { connect } from "react-redux";
import { addQuestion } from "../store/actions/questionActions";

export class AddQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      answer1correct: false,
      answer2correct: false,
      answer3correct: false,
      answer4correct: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);

    this.props.addQuestion(this.state);
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = name.includes("correct") ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <form onSubmit={this.handleSubmit}>
          <div className="text-center mb-4">
            <h2>Add question</h2>
          </div>
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              className="form-control"
              id="question"
              name="question"
              aria-describedby="questionHelp"
              value={this.state.question}
              onChange={this.handleChange}
            />
            <small id="questionHelp" className="form-text text-danger"></small>
          </div>
          <div className="answer">
            <label>Answers</label>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      name="answer1correct"
                      value={this.state.answer1correct}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="answer1"
                  aria-describedby="answer1Help"
                  value={this.state.answer1}
                  onChange={this.handleChange}
                />
              </div>
              <small id="answer1Help" className="form-text text-danger"></small>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      name="answer2correct"
                      value={this.state.answer2correct}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="answer2"
                  aria-describedby="answer2Help"
                  value={this.state.answer2}
                  onChange={this.handleChange}
                />
              </div>
              <small id="answer2Help" className="form-text text-danger"></small>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      name="answer3correct"
                      value={this.state.answer1correct}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="answer3"
                  aria-describedby="answer3Help"
                  value={this.state.answer3}
                  onChange={this.handleChange}
                />
              </div>
              <small id="answer3Help" className="form-text text-danger"></small>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      name="answer4correct"
                      value={this.state.answer4correct}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="answer4"
                  aria-describedby="answer4Help"
                  value={this.state.answer4}
                  onChange={this.handleChange}
                />
              </div>
              <small id="answer4Help" className="form-text text-danger"></small>
            </div>
          </div>
          <small className="form-text text-danger"></small>
          <div className="text-center my-3">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    addQuestion: (payload) => dispatch(addQuestion(payload)),
  };
};

export default connect(null, mapDispathToProps)(AddQuestion);
