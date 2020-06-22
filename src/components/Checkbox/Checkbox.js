import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App/App";

export default function Checkbox(props) {
  const { state, dispatch } = useContext(Context);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (state.selectedTag.toLowerCase() === props.label.toLowerCase()) {
      setIsChecked(true);
    }
    else if(state.selectedTag.length > 0) {
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
      <label style={{ cursor: "pointer" }}>
        <input
          style={{ marginRight: "0.5rem" }}
          type="checkbox"
          checked={isChecked}
          onClick={handleClick}
          onChange={(e) => props.onChange(e.target.checked, props.label)}
        />
        {props.label}
      </label>
    </div>
  );
}
