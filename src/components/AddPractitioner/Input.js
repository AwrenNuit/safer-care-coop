import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Input(props) {
  const [check, setCheck] = useState(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    if (focus) {
      return;
    } else {
      if (props.label === "Phone Number" && !check.test(props.value)) {
        showToast();
      }
    }
  }, [focus]);

  const setStyle = (type) => {
    if (!props.required || focus) {
      return;
    } else {
      if (props.label === "Phone Number" && !check.test(props.value)) {
        if (type === "label") {
          return { color: "red" };
        } else {
          return { borderColor: "red" };
        }
      } else if (props.label !== "Phone Number" && props.value.length === 0) {
        if (type === "label") {
          return { color: "red" };
        } else {
          return { borderColor: "red" };
        }
      } else {
        return;
      }
    }
  };

  const showToast = () => {
    toast("🛑 Use format xxx-xxx-xxxx", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {props.type === "text" ? (
        <div style={{ marginTop: "20px" }}>
          <label style={setStyle("label")}>
            {props.required ? `${props.label} (required)` : props.label}
          </label>
          <br />
          <input
            className="form-input"
            onBlur={() => setFocus(false)}
            onChange={(e) => props.setValue(e.target.value)}
            onFocus={() => setFocus(true)}
            placeholder={props.placeholder}
            style={setStyle("input")}
            type={props.type}
            value={props.value}
          />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      ) : (
        <label
          className={
            props.type === "checkbox" ? "checkbox-container" : "radio-container"
          }
        >
          {props.label}
          <input
            className={props.type === "checkbox" ? "checkbox" : "radio"}
            name={props.name || null}
            onChange={(e) => props.handleChange(e.target.checked, props.label)}
            type={props.type}
            value={props.value}
          />
          <span
            className={
              props.type === "checkbox" ? "checkbox-check" : "radio-active"
            }
          ></span>
        </label>
      )}
    </>
  );
}
