import React from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import dashbord from "../utils/dashbord.svg";
import totalContact from "../utils/totalContact.svg";
import signOut from "../utils/signOut.svg";
import { motion } from "framer-motion";

const Aside = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: actionType.REMOVE_USER });
    navigate("/");
  };
  return (
    <aside className="sidebar">
      <div className="sidetop">
        <motion.p whileTap={{ scale: 0.6 }} className="asidelogo">
          Logo
        </motion.p>
        <div>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={dashbord}
            alt="dashbord"
            className="dashbord"
          />
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={totalContact}
            alt="totalContact"
            className="asideOpenimg"
          />
        </div>
      </div>

      <motion.img
        whileTap={{ scale: 0.95 }}
        src={signOut}
        alt="signOut"
        onClick={handleClick}
        className="signOutBtn"
      />
    </aside>
  );
};

export default Aside;