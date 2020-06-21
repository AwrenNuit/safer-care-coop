import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "react-star-ratings";
import "./Results.css";
import { Context } from "../App/App";

export default function Results() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(state.searchResults);
  }, [state.searchResults]);

  useEffect(() => {
    if (state.searchResults.length === 0) {
      setSearchResults(Object.values(state.allPractitioners));
    }
  }, [state.allPractitioners]);

  const searchTag = (selectedTag) => {
    const all = state.allPractitioners;
    const matches = [];
    for (let i = 0; i < Object.keys(all).length; i++) {
      if (Object.values(all)[i].tags) {
        for (let tag of Object.values(all)[i].tags) {
          if (
            tag.toLowerCase() === selectedTag.toLowerCase() &&
            !matches.includes(Object.values(all)[i].bio)
          ) {
            if (matches.length === 0) {
              matches.push(
                Object.entries(all)[i].filter(
                  (key) => key !== Object.keys(all)[i]
                )
              );
            } else {
              if (
                !Object.values(matches)[matches.length - 1][0].bio.includes(
                  Object.values(all)[i].bio
                )
              ) {
                matches.push(
                  Object.entries(all)[i].filter(
                    (key) => key !== Object.keys(all)[i]
                  )
                );
              }
            }
          }
        }
      }
    }
    dispatch({ type: `SET_SEARCH_RESULTS`, payload: matches });
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
                src={item.image}
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
                name="rating"
                numberOfStars={5}
                rating={
                  item.ratings && item.numRatings
                    ? Object.values(item.ratings).reduce((a, b) => a + b, 0) /
                      item.numRatings
                    : 0
                }
                starDimension="20px"
                starRatedColor="gold"
                starSpacing="0"
              />
              {!item.ratings || !item.numRatings ? <p>no ratings yet</p> : ""}
              <p>{item.bio}</p>
              <p className="tags">
                Tags:{" "}
                {item.tags ? (
                  item.tags.map((tag, j) => (
                    <span
                      className="this-tag"
                      key={j}
                      onClick={() => searchTag(tag)}
                    >
                      {(j ? ", " : "") + tag}
                    </span>
                  ))
                ) : (
                  <span>No tags yet</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
