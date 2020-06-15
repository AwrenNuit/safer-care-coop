import React from "react";

export default function Checkbox(props) {
  return (
    // set each checkbox to grid
    <div style={{ display: "inline-block", marginRight: "1rem" }}>
      <label>
        <input
          type="checkbox"
          onChange={(e) => props.setting(e.target.checked)}
        />
        {props.label}
      </label>
    </div>
  );
}
