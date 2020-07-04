import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SelectedPractitioner.css";
import { Context } from "../App/App";
import StarRating from "react-star-ratings";
import Reviews from "../Reviews/Reviews";
import NewReview from "../NewReview/NewReview";
import AddTag from "../AddTag/AddTag";

export default function SelectedPractitioner() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const practitioner = state.selectedPractitioner;
  const [calculatedRating, setCalculatedRating] = useState(0);
  const [modal, setModal] = useState(false);
  const [zeroRatings, setZeroRatings] = useState(false);

  useEffect(() => {
    if (!state.selectedPractitioner.name) {
      history.push("/");
    }
    if (practitioner.ratings) {
      setCalculatedRating(
        Object.values(practitioner.ratings).reduce((a, b) => a + b, 0) /
          practitioner.numRatings
      );
    } else {
      setZeroRatings(true);
    }
  }, []);

  const closeModal = () => {
    setModal(false);
  }

  const openModal = () => {
    setModal(true)
  }

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
    dispatch({ type: `SET_SELECTED_TAG`, payload: selectedTag });
    dispatch({ type: `SET_SEARCH_RESULTS`, payload: matches });
    history.push("/results");
  };

  return (
    <div className="main-container">
      {modal ? <AddTag closeModal={closeModal} /> : null}
      <p className="back-btn" onClick={() => history.goBack()}>
        &#8656; Return to Search Results
      </p>
      <div className="grid">
        <div className="grid-img" id="selected-grid-img">
          <img
            id="selected-img"
            src={
              practitioner.image ? practitioner.image : "/images/no-avatar.png"
            }
            alt=""
          />
        </div>
        <div className="grid-name">
          <h1>{practitioner.name}</h1>
        </div>
        <div className="grid-employer">
          <p className="fs-phone">
            {practitioner.employer} |{" "}
            <a href={`tel:1-${practitioner.phone}`}>{practitioner.phone}</a>
          </p>
          <div className="ms-phone">
            <p>{practitioner.employer}</p>
            <p>
              <a href={`tel:1-${practitioner.phone}`}>{practitioner.phone}</a>
            </p>
          </div>
        </div>
        <div className="grid-rating">
          <StarRating
            name="rating"
            numberOfStars={5}
            rating={calculatedRating}
            starDimension="30px"
            starRatedColor="gold"
            starSpacing="0"
          />
          {zeroRatings ? <p>no ratings yet</p> : ""}
        </div>
        <div className="grid-bio">
          {practitioner.bio ? (
            <p>{practitioner.bio}</p>
          ) : (
            <p>Bio coming soon...</p>
          )}
        </div>
        <div
          style={{ display: "inline-block", float: "left", height: "80px" }}
        ></div>
        <div className="grid-tags">
          {practitioner.tags ? (
            <p className="tags">
              Tags:{" "}
              {practitioner.tags.map((tag, i) => (
                <span
                  className="this-tag"
                  key={i}
                  onClick={() => searchTag(tag)}
                >
                  {(i ? ", " : "") + tag}
                </span>
              ))}{" "}
              <span id="add-tag" onClick={openModal}>
                +&nbsp;Add&nbsp;Tag
              </span>
            </p>
          ) : (
            <p>Tags: No tags yet</p>
          )}
        </div>
      </div>
      <NewReview
        thisPractitioner={practitioner.name}
        ratings={practitioner.ratings}
        numRatings={practitioner.numRatings}
      />
      {practitioner.reviews ? (
        <Reviews reviews={practitioner.reviews} />
      ) : (
        <h2 style={{ marginTop: "20px" }}>No reviews yet.</h2>
      )}
    </div>
  );
}
