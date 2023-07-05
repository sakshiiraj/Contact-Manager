import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useStateValue } from "../context/StateProvider";

const Popup = ({ fetchData, setIsPop, setSuccessUp }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();

  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("csv", file);
    const jsonData = await fetch(process.env.REACT_APP_API + "/upload", {
      method: "POST",
      headers: {
        authorization: state.user.token,
      },
      body: formData,
    });

    const response = await jsonData.json();
    fetchData();
    if (response.status === "success") {
      setSuccessUp(true);
      setTimeout(() => {
        setSuccessUp(false);
      }, 3000);
    }
    setIsPop(false);
    console.log(response);
  };
  return (
    <div className="popup">
      <FileUploader handleChange={handleChange} name="file" types={["CSV"]} />
    </div>
  );
};

export default Popup;