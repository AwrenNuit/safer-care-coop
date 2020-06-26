import React from "react";

export default function TextInput(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input
        onChange={(e) => props.handleChange(e.target.value, props.thisValueSet)}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
      />
    </div>
  );
}
