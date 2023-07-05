import React from "react";
import successDelete from "../utils/successDelete.svg";

const SuccessDelete = () => {
  return (
    <div className="popup">
      <img src={successDelete} alt="successDelete" />
    </div>
  );
};

export default SuccessDelete;