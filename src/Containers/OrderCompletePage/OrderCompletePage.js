import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import OrderComplete from "../../Components/OrderComplete/OrderComplete";

const OrderCompletePage = () => {
  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "100vh" }}
    >
      <Navbar />
      <OrderComplete />
      <Footer />
    </div>
  );
};

export default OrderCompletePage;
