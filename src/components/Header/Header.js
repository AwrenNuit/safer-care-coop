import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import Searchbar from "../Searchbar/Searchbar";

export default function Header() {
  const history = useHistory();

  return (
    <div id="header-container">
      <div id="header" onClick={() => history.push("/")}>
        <h2>Safer Care Co-op</h2>
      </div>
      <Searchbar />
    </div>
  );
}
