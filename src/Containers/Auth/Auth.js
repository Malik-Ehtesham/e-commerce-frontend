import React from "react";

import Footer from "../../Components/Footer/Footer";
import LoginForm from "../../Components/LoginForm/LoginForm";
import Navbar from "../../Components/Navbar/Navbar";

const Auth = () => {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-between flex-column"
    >
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Auth;
