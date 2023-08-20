import React from "react";

import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Products from "../../Components/Products/Products";

const Home = () => {
  return (
    <div
      style={{ backgroundColor: "rgb(255, 255, 255)", minHeight: "100vh" }}
      className="d-flex justify-content-between flex-column"
    >
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
