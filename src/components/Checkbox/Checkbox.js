import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App/App";
import './Checkbox.css';

export default function Checkbox(props) {
  const { state, dispatch } = useContext(Context);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (state.selectedTag.toLowerCase() === props.label.toLowerCase()) {
      setIsChecked(true);
    } else if (state.selectedTag.length > 0) {
      setIsChecked(false);
    }
  }, [state.selectedTag]);

  const handleClick = () => {
    if (state.selectedTag.toLowerCase() === props.label.toLowerCase()) {
      dispatch({ type: `SET_SELECTED_TAG`, payload: "" });
    }
    setIsChecked(!isChecked);
  };

  return (
    <div style={{ display: "inline-block", margin: "0 1rem 0.5rem 0" }}>
      <label className="checkbox-container">
        {props.label}
        <input
          checked={isChecked}
          className="checkbox"
          onChange={(e) => props.onChange(e.target.checked, props.label)}
          onClick={handleClick}
          type="checkbox"
        />
        <span class="checkbox-check"></span>
      </label>
    </div>
  );
}
