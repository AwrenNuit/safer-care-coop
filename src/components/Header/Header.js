import React from "react";
import "./Header.css";
import Searchbar from "../Searchbar/Searchbar";

export default function Header() {
  return (
    <div id="header-container">
      <div id="header">
        <h2>[Safer Healthcare]</h2>
      </div>
      <Searchbar />
    </div>
  );
}
