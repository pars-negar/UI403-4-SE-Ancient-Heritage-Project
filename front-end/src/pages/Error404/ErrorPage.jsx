import { Navbar } from "react-bootstrap";
import React from "react";
import Footer from "../../components/Footer/Footer";
import backgroundImage from "../../assets/images/error.png";

const ErrorPage = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary"></Navbar>
      <div className="flex justify-center">
      <div
        className="relative w-full  bg-cover "
        style={{ backgroundImage: `url(${backgroundImage})`, height: "1550px" }}
      ></div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
