import React from "react";
import confirmDelete from "../utils/confirmDelete.svg";
import { motion } from "framer-motion";

const Confirm = ({ setConf, handleDelete }) => {
  return (
    <div className="popup">
      <img src={confirmDelete} alt="Confirm" />
      <div className="popdiv">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="btnCan"
          onClick={() => {
            setConf(false);
          }}
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="btnOk"
          onClick={handleDelete}
        >
          Ok
        </motion.button>
      </div>
    </div>
  );
};

export default Confirm;