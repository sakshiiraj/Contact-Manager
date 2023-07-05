import React from "react";
import AllContact from "../components/AllContact";
import Aside from "../components/Aside";
import Header from "../components/Header";
import Mobile from "../components/Mobile";

const TotalContacts = () => {
  return (
    <>
      <Mobile />
      <div className="mailContainer">
        <Aside />
        <div className="innerContainer">
          <Header />
          <AllContact />
        </div>
      </div>
    </>
  );
};

export default TotalContacts;