import React, { useState } from "react";
import "./Searchbar.css";
import Checkbox from "../Checkbox/Checkbox";
import { useHistory } from "react-router-dom";

export default function Searchbar() {
  const history = useHistory();
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

  const postSearch = () => {
    // generate search based on local state filters and zipcode/city
    history.push("/results");
  };

  return (
    <div id="search-container">
      {/* add icon to searchbar */}
      <input id="searchbar" type="text" placeholder="enter zipcode or city" />
      <button id="search-btn" onClick={postSearch}>
        SEARCH
      </button>
      {/* set each checkbox to grid */}
      {checkboxes.map((item, i) => (
        <Checkbox key={i} label={item.label} setting={item.setting} />
      ))}
    </div>
  );
}
