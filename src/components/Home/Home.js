import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="main-container">
      <h1>Reimagining Healthcare</h1>
      <p>
        People who hold oppressed or marginalized identities often experience
        significant discrimination from healthcare workers. This results in
        worse overall healthcare, less visits to the doctor, and sometimes
        traumatic experiences or death. The system as it exists simply will not
        do. The goal of [Safer Healthcare] is to make it easier for people who
        hold oppressed or marginalized identities to find a healthcare
        practitioner that will provide better care.
      </p>
      <br />
      <p>
        Accounts are not required for basic use like viewing, rating, and
        reviewing doctors. However, an account is required to track Favorites.
      </p>
      <br />
      <p>Search your area for safer healthcare now.</p>
      <br />
      <div style={{ textAlign: "center" }}>
        <button id="home-btn">SEARCH!</button>
      </div>
    </div>
  );
}
