import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProductCard from "../ProductCard/ProductCard";

const SearchedProducts = (props) => {
  // -----------USE STATES------------

  const [width, setWidth] = useState(0);

  // -------------USE EFFECT-------------

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  // COMPONENT
  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-12">
          <p className="text-start fw-bolder fs-2">
            {`Result found for "${props.searchBar}"`}
          </p>
        </div>
      </div>
      <div className="row">
        {props.SearchedProducts.map((SearchedProduct) => {
          return (
            <div
              className="col-md-3 col-6  d-flex  justify-content-center"
              key={SearchedProduct.id}
            >
              {width <= 576 ? (
                <ProductCard
                  id={SearchedProduct.id}
                  width={width}
                  title={SearchedProduct.title.substring(0, 40)}
                  description={SearchedProduct.description.substring(0, 70)}
                  image={SearchedProduct.image}
                  price={SearchedProduct.price}
                  category={SearchedProduct.category}
                />
              ) : (
                <ProductCard
                  id={SearchedProduct.id}
                  width={width}
                  title={SearchedProduct.title.substring(0, 50)}
                  description={SearchedProduct.description.substring(0, 100)}
                  image={SearchedProduct.image}
                  price={SearchedProduct.price}
                  category={SearchedProduct.category}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    SearchedProducts: state.SearchedProducts.SearchedProducts,
    searchBar: state.SearchedProducts.searchBar,
  };
};
export default connect(mapStateToProps)(SearchedProducts);
