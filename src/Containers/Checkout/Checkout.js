import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "100vh" }}
    >
      <Navbar />
      <CheckoutForm />
      <Footer />
    </div>
  );
};

export default Checkout;
