import React, { useRef, useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import singleDelete from "../utils/singleDelete.png";
import { motion } from "framer-motion";

const SingleContact = ({
  _id,
  name,
  designation,
  company,
  industry,
  email,
  phNo,
  country,
  fetchData,
  setSucDel,
}) => {
  const [state, dispatch] = useStateValue();
  const inputRef = useRef();
  const [isHover, setIsHover] = useState(false);

  const handleClick = async (_id) => {
    const deleteConct = {};
    deleteConct[_id] = 1;
    const getRes = await fetch(process.env.REACT_APP_API + "/contact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: state.user.token,
      },

      body: JSON.stringify(deleteConct),
    });

    const response = await getRes.json();
    fetchData();
    if (response.status === "success") {
      setSucDel(true);
      setTimeout(() => {
        setSucDel(false);
      }, 2000);
    }
    console.log(response);
  };

  useEffect(() => {
    if (state.isChecked) {
      inputRef.current.checked = true;
    } else if (Object.keys(state.mark).length === 0) {
      inputRef.current.checked = false;
    }
  });

  return (
    <>
      <tr>
        <td className="checkboxs">
          <input
            type="checkbox"
            ref={inputRef}
            onClick={() =>
              dispatch({ type: actionType.ADD_MARK, payload: { id: _id } })
            }
          />
        </td>
        <td className="name">{name}</td>
        <td className="designation">{designation}</td>
        <td className="company">{company}</td>
        <td className="industry">{industry}</td>
        <td
          className="email"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {email}
          {isHover && (
            <p className="emailHover">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {email}
              </a>
            </p>
          )}
        </td>
        <td className="phoneNumber">{phNo}</td>
        <td className="country">{country}</td>
        <td className="action">
          <motion.img
            whileTap={{ scale: 0.8 }}
            src={singleDelete}
            alt="Delete"
            onClick={() => {
              handleClick(_id);
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default SingleContact;