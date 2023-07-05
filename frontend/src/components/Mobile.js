import React from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Mobile = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: actionType.REMOVE_USER });
    navigate("/");
  };

  return (
    <div className="app">
      <p>Open from Computer or Laptop</p>
      <motion.button whileTap={{ scale: 0.95 }} onClick={handleClick}>
        Log Out
      </motion.button>
    </div>
  );
};

export default Mobile;