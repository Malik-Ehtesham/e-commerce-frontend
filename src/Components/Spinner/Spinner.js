import React from "react";

import Loader from "../../utils/Spinner/Spinner.png";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <img
        src={Loader}
        style={{ width: "150px" }}
        className=" rounded-circle"
      />
    </div>
  );
};

export default Spinner;
