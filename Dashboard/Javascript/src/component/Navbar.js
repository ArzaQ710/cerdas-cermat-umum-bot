import React from "react";
import { connect } from "react-redux";

export function NavMenu({ text, url }) {
  return (
    <React.Fragment>
      <li className="nav-item">
        <a className="nav-link" href={url}>
          {text}
        </a>
      </li>
    </React.Fragment>
  );
}

function Navbar({ state }) {
  console.log(state);

  const navMenuItem = [
    { text: "Question list", url: "/questionlist" },
    { text: "Add question", url: "/addquestion" },
    { text: "Add editor", url: "/addeditor" },
  ];

  const navMenu = navMenuItem.map(({ id, text, url }) => {
    return <NavMenu text={text} url={url} key={url} />;
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-md-5">
      <a className="navbar-brand" href="/">
        CCU
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">{navMenu}</ul>
        <div className="my-2 my-lg-0">
          <button type="button" className="btn btn-light">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Navbar);
