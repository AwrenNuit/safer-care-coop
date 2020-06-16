import React, { useContext } from "react";
import './SelectedPractitioner.css';

export default function SelectedPractitioner() {
  // const { state, dispatch } = useContext(selectedPractitionerContext);

  return (
    <div className="main-container">
      {/* <h1>{state.name}</h1>
      <div>
        <img src={state.img} alt="" />
        <div>
          <p>{state.employer}</p>
          <div>{state.rating}</div>
          <p>{state.bio}</p>
          <p>Tags: {state.tags.map((tag, i) => <span>{tag}</span>)}</p>
        </div>
      </div> */}
      <h1 style={{textAlign:"center"}}>Doctor 1</h1>
      <div id="selected-grid">
        <img id="selected-img" src="/images/doc.png" alt="" />
        <div>
          <p>Employer</p>
          <div>3/5 stars</div>
          <p>Here's a brief bio about this healthcare practitioner. They mostly do this type of work.</p>
          <p>Tags: <span>Transgender </span><span>POC </span><span>Women </span></p>
        </div>
      </div>
    </div>
  );
}
