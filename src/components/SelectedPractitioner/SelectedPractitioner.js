import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SelectedPractitioner.css";
import { Context } from "../App/App";
import StarRating from "react-star-ratings";
import Reviews from "../Reviews/Reviews";
import NewReview from "../NewReview/NewReview";

export default function SelectedPractitioner() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const practitioner = state.selectedPractitioner;
  const [calculatedRating, setCalculatedRating] = useState(0);
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

  return (
    <div className="main-container">
      <div id="selected-grid">
        <img id="selected-img" src={practitioner.image} alt="" />
        <div>
          <h1>{practitioner.name}</h1>
          <p>{practitioner.employer}</p>
          <StarRating
            name="rating"
            numberOfStars={5}
            rating={calculatedRating}
            starDimension="20px"
            starRatedColor="gold"
            starSpacing="0"
          />
          {zeroRatings ? <p>no ratings yet</p> : ""}
          <p>{practitioner.bio}</p>
          {practitioner.tags ? (
            <p className="tags">
              Tags:{" "}
              {practitioner.tags.map((tag, i) => (
                <span className="this-tag" key={i}>
                  {tag}
                </span>
              ))}
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
      <Reviews reviews={practitioner.reviews} />
    </div>
  );
}
