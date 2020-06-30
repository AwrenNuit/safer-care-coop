import React from "react";

export default function Input(props) {
  const setStyle = (type) => {
    if (!props.required) {
      return;
    } else {
      if (props.label === "Phone Number" && props.value.length !== 12) {
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
  
  return (
    <>
      {props.type === "text" ? (
        <div style={{ marginTop: "20px" }}>
          <label style={setStyle('label')}>
            {props.required ? `${props.label} (required)` : props.label}
          </label>
          <br />
          <input
            className="form-input"
            onChange={(e) => props.setValue(e.target.value)}
            placeholder={props.placeholder}
            style={setStyle('input')}
            type={props.type}
            value={props.value}
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
