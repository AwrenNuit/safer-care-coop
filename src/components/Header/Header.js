import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div id="header-container">
      <div id="header">
        <h2>[Safer Healthcare]</h2>
      </div>
      {/* add icon to searchbar */}
      <input
        id="searchbar"
        type="text"
        placeholder="enter zipcode or city"
      />
    </div>
  );
}
