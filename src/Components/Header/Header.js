import React from "react";

const Header = (props) => {
  return (
    <nav className="navbar bg-secondary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 fs-1">{props.children}</span>
      </div>
    </nav>
  );
};

export default Header;
