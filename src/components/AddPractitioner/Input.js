import React from "react";

export default function Input(props) {
  return (
    <div>
      {props.type === "text" ? (
        <>
          <label>{props.label}</label>
          <input
            onChange={(e) => props.setValue(e.target.value)}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
          />
        </>
      ) : (
        <label>
          <input
            onChange={(e) => props.handleChange(e.target.checked, props.label)}
            type={props.type}
            value={props.value}
          />
          {props.label}
        </label>
      )}
    </div>
  );
}
