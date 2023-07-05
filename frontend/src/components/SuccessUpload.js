import React from "react";
import successUpload from "../utils/successUpload.svg";

const SuccessUpload = () => {
  return (
    <div className="popup">
      <img src={successUpload} alt="successUpload" id="successUpload" />
    </div>
  );
};

export default SuccessUpload;