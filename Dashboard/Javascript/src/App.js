import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddQuestion from "./component/AddQuestion";
import AddEditor from "./component/AddEditor";
import QuestionList from "./component/QuestionList";
import EditQuestion from "./component/EditQuestion";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>

        <div className="cotainer px-3">
          <Switch>
            <Route path="/questionlist" component={QuestionList} />
            <Route path="/addquestion" component={AddQuestion} />
            <Route path="/addeditor" component={AddEditor} />
            <Route path="/editquestion/:id" component={EditQuestion} />
            {/* <Route exact path="/" component={} /> */}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
