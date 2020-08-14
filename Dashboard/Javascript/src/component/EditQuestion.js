import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editQuestion, deleteQuestion } from "../store/actions/questionActions";

export class EditQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.question;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);

    const payload = this.state;
    const id = this.props.match.params.id;

    this.props.editQuestion(payload, id);
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = name.includes("correct") ? target.checked : target.value;

    console.log(name, value);

    this.setState({
      [name]: value,
    });
  };

  handleDelete = () => {
    const id = this.props.match.params.id;

    this.props.deleteQuestion(id);
  };

  render() {
    return !this.state ||
      this.props.match.params.id === this.props.deletedQuestion ? (
      <Redirect to="/questionlist" />
    ) : (
      <div className="mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <form onSubmit={this.handleSubmit}>
          <div className="text-center mb-4">
            <h2>Edit Question</h2>
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
                      checked={this.state.answer1correct}
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
                      checked={this.state.answer2correct}
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
                      checked={this.state.answer3correct}
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
                      checked={this.state.answer4correct}
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
              Edit
            </button>
          </div>
        </form>

        <div className="text-center my-3">
          <button className="btn btn-primary" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, params) => {
  const id = params.match.params.id;

  return state.firestore.data.questions
    ? {
        question: state.firestore.data.questions[id],
        deletedQuestion: state.question.deleted,
      }
    : { question: false };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editQuestion: (payload, id) => dispatch(editQuestion(payload, id)),
    deleteQuestion: (id) => dispatch(deleteQuestion(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
