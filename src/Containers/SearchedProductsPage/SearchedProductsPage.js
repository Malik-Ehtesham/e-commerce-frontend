import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import SearchedProducts from "../../Components/SearchedProducts/SearchedProducts";
import Footer from "../../Components/Footer/Footer";

const SearchedProductsPage = () => {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column justify-content-between"
    >
      <Navbar />
      <SearchedProducts />
      <Footer />
    </div>
  );
};

export default SearchedProductsPage;
