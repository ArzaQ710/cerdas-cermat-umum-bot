import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

function QuestionListItem({ question, id }) {
  return (
    <div className="col-sm-12 mb-3">
      <div className="card mx-auto" style={{ maxWidth: "700px" }}>
        <div className="row px-4">
          <div className="col-sm-12 col-md-10 d-flex align-items-center">
            <p className="card-text">{question}</p>
          </div>
          <div className="col-sm-12 col-md-2">
            <div
              className="card-footer text-muted text-center"
              style={{ border: 0 }}
            >
              <Link to={`/editquestion/${id}`}>Edit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionList() {
  useFirestoreConnect(["questions"]);

  const questions = useSelector((state) => state.firestore.ordered.questions);

  const questionList =
    questions &&
    questions.map((item) => {
      return <QuestionListItem question={item.question} id={item.id} key={item.id} />;
    });

  return <div className="row mt-5">{questionList}</div>;
}

export default QuestionList;
