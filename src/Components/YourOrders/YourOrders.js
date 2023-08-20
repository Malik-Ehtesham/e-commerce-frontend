import React from "react";
import { connect } from "react-redux";

import YourOrdersCard from "../YourOrdersCard/YourOrdersCard";
import Spinner from "../Spinner/Spinner";

const YourOrders = (props) => {
  return props.loading ? (
    <Spinner />
  ) : (
    <div className="border border-secondary border-2 rounded-1 my-2">
      {props.Orders.length !== 0 ? (
        props.Orders.map((Order) => {
          return (
            <YourOrdersCard
              key={Order._id}
              id={Order._id}
              products={Order.products}
              totalPrice={Order.totalPrice}
              status={Order.status}
            />
          );
        })
      ) : (
        <p className="fs-4 fw-semibold text-center">No Orders</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.AdminPanel.loading,
    Orders: state.AdminPanel.Orders,
  };
};

export default connect(mapStateToProps)(YourOrders);
