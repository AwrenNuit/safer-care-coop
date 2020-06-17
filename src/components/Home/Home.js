import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
        Making Healthcare Safer
      </h1>
      <p>
        People who hold oppressed or marginalized identities often experience
        significant discrimination from healthcare workers. This results in
        worse overall healthcare, less visits to the doctor, and sometimes
        traumatic experiences or death. The system as it exists simply will not
        do. The goal of [Safer Healthcare] is to make it easier for people who
        hold oppressed or marginalized identities to find a healthcare
        practitioner that will provide better care.
      </p>
    </div>
  );
}
