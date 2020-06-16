import React, { useContext } from "react";
import './SelectedPractitioner.css';
import { SelectedPractitionerContext } from "../App/App";

export default function SelectedPractitioner() {
  const { state, dispatch } = useContext(SelectedPractitionerContext);

  return (
    <div className="main-container">
      <h1>{state.name}</h1>
      <div>
        <img src={state.img} alt="" />
        <div>
          <p>{state.employer}</p>
          <div>{state.rating}</div>
          <p>{state.bio}</p>
          <p>Tags: {state.tags.map((tag, i) => <span key={i}>{tag}</span>)}</p>
        </div>
      </div>
    </div>
  );
}
