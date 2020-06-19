import React from "react";

export default function Checkbox(props) {
  return (
    <div style={{ display: "inline-block", margin: "0 1rem 0.5rem 0" }}>
      <label style={{cursor:"pointer"}}>
        <input
          style={{ marginRight: "0.5rem" }}
          type="checkbox"
          onChange={(e) => props.onChange(e.target.checked, props.label)}
        />
        {props.label}
      </label>
    </div>
  );
}
