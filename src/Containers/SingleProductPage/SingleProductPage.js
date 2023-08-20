import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";

const SingleProductPage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "100vh" }}
    >
      <Navbar />
      <SingleProduct />
      <Footer />
    </div>
  );
};

export default SingleProductPage;
