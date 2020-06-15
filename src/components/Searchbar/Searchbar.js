import React, { useState } from "react";
import "./Searchbar.css";
import Checkbox from "../Checkbox/Checkbox";

export default function Searchbar() {
  const [GP, setGP] = useState(false);
  const [therapist, setTherapist] = useState(false);
  const [POC, setPOC] = useState(false);
  const [trans, setTrans] = useState(false);
  const [women, setWomen] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { setting: setGP, label: "General Practitioner" },
    { setting: setTherapist, label: "Therapist" },
    { setting: setPOC, label: "POC" },
    { setting: setTrans, label: "Transgender" },
    { setting: setWomen, label: "Women" },
  ]);

  return (
    <div id="search-container">
      {/* add icon to searchbar */}
      <input id="searchbar" type="text" placeholder="enter zipcode or city" />
      <button id="search-btn">SEARCH</button>
      {/* set each checkbox to grid */}
      {checkboxes.map((item, i) => (
        <Checkbox key={i} label={item.label} setting={item.setting} />
      ))}
    </div>
  );
}
