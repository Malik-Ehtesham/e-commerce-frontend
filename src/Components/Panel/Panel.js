import React from "react";

import Sidebar from "../Sidebar/Sidebar";

const Panel = () => {
  return (
    <div className="conatiner">
      <div className="row">
        <div className="col-2 p-0">
          <Sidebar />
        </div>
        <div className="col-10 bg-danger p-0 m-0 overflow-hidden"></div>
      </div>
    </div>
  );
};

export default Panel;
