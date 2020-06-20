import React, { useContext, useState, useEffect } from "react";
import './SelectedPractitioner.css';
import { Context } from "../App/App";
import StarRating from 'react-star-ratings';
import Reviews from "../Reviews/Reviews";
import NewReview from "../NewReview/NewReview";

export default function SelectedPractitioner() {
  const { state, dispatch } = useContext(Context);
  const practitioner = state.selectedPractitioner;
  const [calculatedRating, setCalculatedRating] = useState(0);
  const [zeroRatings, setZeroRatings] = useState(false);

  useEffect(() => {
    if(practitioner.ratings) {
      setCalculatedRating(Object.values(practitioner.ratings).reduce((a, b) => a + b, 0) / practitioner.numRatings);
    } else {
      setZeroRatings(true);
    }
  }, []);

  return (
    <div className="main-container">
      <h1>{practitioner.name}</h1>
      <div id="selected-grid">
        <img id="selected-img" src={practitioner.image} alt="" />
        <div>
          <p>{practitioner.employer}</p>
          <StarRating
            name='rating'
            numberOfStars={5}
            rating={calculatedRating}
            starDimension="20px"
            starRatedColor="gold"
            starSpacing="0"
          />
          {zeroRatings ?
            <p>no ratings</p>
          :
            ''
          }
          <p>{practitioner.bio}</p>
          <p>Tags: {practitioner.tags.map((tag, i) => <span key={i}>{tag}</span>)}</p>
        </div>
      </div>
      <NewReview thisPractitioner={practitioner.name} ratings={practitioner.ratings} numRatings={practitioner.numRatings} />
      <Reviews />
    </div>
  );
}
