import React from "react";

import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import YourOrders from "../../Components/YourOrders/YourOrders";

const Orders = () => {
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-between "
        style={{ minHeight: "100vh" }}
      >
        <Navbar />
        <YourOrders />
        <Footer />
      </div>
    </div>
  );
};

export default Orders;
