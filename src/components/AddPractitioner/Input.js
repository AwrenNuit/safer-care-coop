import React from "react";

export default function Input(props) {
  return (
    <>
      {props.type === "text" ? (
        <div style={{ marginTop: "20px" }}>
          <label>{props.label}</label>
            <br />
            <input
              className="form-input"
              onChange={(e) => props.setValue(e.target.value)}
              placeholder={props.placeholder}
              type={props.type}
              value={props.value}
            />
        </div>
      ) : (
        <label>
          <br />
          <input
            name={props.name || null}
            onChange={(e) => props.handleChange(e.target.checked, props.label)}
            type={props.type}
            value={props.value}
          />
          {props.label}
        </label>
      )}
    </>
  );
}
