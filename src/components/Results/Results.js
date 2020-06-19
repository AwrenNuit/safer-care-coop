import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Results.css";
import { Context } from "../App/App";
import StarRating from 'react-star-ratings';

export default function Results() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(state.searchResults);
  }, [state.searchResults]);

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
            <div onClick={() => selectDoctor(item)}>
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
              <StarRating
                name='rating'
                numberOfStars={5}
                rating={item.ratings.reduce((a, b) => a + b, 0) / item.numRatings}
                starDimension="20px"
                starRatedColor="gold"
                starSpacing="0"
              />
              <p>{item.bio}</p>
              <p className="tags">
                Tags:{" "}
                {item.tags.map((tag, j) => (
                  <span className="this-tag" key={j} onClick={() => searchTag(tag)}>
                    {(j ? ", " : "") + tag}
                  </span>
                ))}
                {/* {item.tags.join(', ')} */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
