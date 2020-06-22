import React, { useState, useContext, useEffect } from "react";
import "./Searchbar.css";
import Checkbox from "../Checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { Context } from "../App/App";

export default function Searchbar() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [checkboxes, setCheckboxes] = useState([
    "General Practitioner",
    "Therapist",
    "POC",
    "Transgender",
    "Women",
    "Placeholder",
  ]);

  useEffect(() => {
    if (state.selectedTag) {
      setSelectedFilters(() => [state.selectedTag]);
    }
  }, [state.selectedTag]);

  const handleFilterChange = (e, label) => {
    if (e) {
      setSelectedFilters((selectedFilters) => [...selectedFilters, label]);
    } else {
      setSelectedFilters(selectedFilters.filter((tag) => tag !== label));
    }
  };

  const postSearch = () => {
    const all = state.allPractitioners;
    const matches = [];
    if (selectedFilters.length === 0) {
      matches.push(Object.values(state.allPractitioners));
    } else {
      for (let i = 0; i < Object.keys(all).length; i++) {
        if (Object.values(all)[i].tags) {
          for (let tag of Object.values(all)[i].tags) {
            for (let filter of selectedFilters) {
              if (
                tag.toLowerCase() === filter.toLowerCase() &&
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
      }
    }
    dispatch({ type: `SET_SEARCH_RESULTS`, payload: matches });
    dispatch({ type: `SET_SELECTED_TAG`, payload: "" });
    history.push("/results");
  };

  return (
    <div id="search-container">
      {/* add icon to searchbar */}
      {/* searchbar will only be available once zipcode logic is implemented */}
      {/* for now will just search minneapolis area */}
      {/* <input id="searchbar" type="text" placeholder="enter zipcode or city" /> */}
      <div id="filter-grid">
        {checkboxes.map((label, i) => (
          <Checkbox key={i} label={label} onChange={handleFilterChange} />
        ))}
      </div>
      <button id="search-btn" onClick={postSearch}>
        SEARCH
      </button>
    </div>
  );
}
