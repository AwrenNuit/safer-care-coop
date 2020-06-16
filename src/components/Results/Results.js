import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Results.css";
import { SelectedPractitionerContext } from "../App/App";

export default function Results() {
  const history = useHistory();
  const { state, dispatch } = useContext(SelectedPractitionerContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults([
      {
        name: "Doctor 1",
        employer: "Employer",
        rating: 3,
        bio: `Here's a brief bio about this healthcare practitioner. They mostly do this type of work.`,
        tags: ["transgender", "POC", "women"],
      },
      {
        name: "Doctor 2",
        employer: "Employer",
        rating: 6,
        bio: `Here's a brief bio about this healthcare practitioner. They mostly do this type of work.`,
        tags: ["POC"],
      },
      {
        name: "Doctor 3",
        employer: "Employer",
        rating: 10,
        bio: `Here's a brief bio about this healthcare practitioner. They mostly do this type of work.`,
        tags: ["transgender", "women"],
      },
      {
        name: "Doctor 4",
        employer: "Employer",
        rating: 1,
        bio: `Here's a brief bio about this healthcare practitioner. They mostly do this type of work.`,
        tags: ["women"],
      },
    ]);
  }, []);

  const searchTag = (tag) => {
    // search based on selected tag
  };

  const selectDoctor = (doctor) => {
    dispatch({
      type: `SET_DOCTOR`,
      payload: doctor,
    });
    history.push(`/practitioner/${doctor.name}`);
  };

  return (
    <div className="main-container">
      <h1>Practitioners in Your Area</h1>
      <div>
        {searchResults.map((item, i) => (
          <div key={i} id="results-grid">
            <div onClick={() => selectDoctor(item.name)}>
              <img
                className="results-img"
                src="/images/doc.png"
                alt="img from database"
              />
            </div>
            <div>
              <h2 className="results-name" onClick={() => selectDoctor(item)}>
                {item.name}
              </h2>
              <p>
                <i>{item.employer}</i>
              </p>
              <p>{item.rating}</p>
              <p>{item.bio}</p>
              <p className="tags">
                Tags:{" "}
                {item.tags.map((tag, j) => (
                  // turn into links, clicking returns results of clicked tag
                  <span className="this-tag" key={j} onClick={() => searchTag(tag)}>
                    {(j ? ", " : "") + tag}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
