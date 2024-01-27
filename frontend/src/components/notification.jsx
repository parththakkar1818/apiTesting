import "./App.css";
import "./index.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {

  const [name,setName]=useState("");

  const notify = () => {
    // toast("Default Notification !");

    toast.success(`Hello from ${name}`, {
      position: "top-center",
      autoClose: 5000,
      // hideProgressBar: false, not required as by default false
      // newestOnTop: true,
      // closeOnClick: true,
      // rtl: false, not required as by default false reverse
      // pauseOnFocusLoss: false, nothing much 
      // draggable: true,
      // pauseOnHover: true,
      // theme: "light",
      // transition: "flip" //bounce,size,zoo,flip
    });

    // toast.error("Error Notification !", {
    //   position: "top-left",
    // });

    // toast.warn("Warning Notification !", {
    //   position: "bottom-left",
    // });

    // toast.info("Info Notification !", {
    //   position: "bottom-center",
    // });

    // toast("Custom Style Notification with css class!", {
    //   position: "bottom-right",
    //   className: "foo-bar",
    // });
  };

  return (
    <>
      <button onMouseOver={notify}>Notify</button>
      <input
        type="text"
        placeholder="Enter"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ToastContainer />
    </>
  );
}

export default Notifications;