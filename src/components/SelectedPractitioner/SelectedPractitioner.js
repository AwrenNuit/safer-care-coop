import React, { useContext } from "react";
import './SelectedPractitioner.css';
import { Context } from "../App/App";
import StarRating from 'react-star-ratings';
import Reviews from "../Reviews/Reviews";
import NewReview from "../NewReview/NewReview";

export default function SelectedPractitioner() {
  const { state, dispatch } = useContext(Context);
  const practitioner = state.selectedPractitioner;

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
            rating={practitioner.rating}
            starDimension="20px"
            starRatedColor="gold"
            starSpacing="0"
          />
          <p>{practitioner.bio}</p>
          <p>Tags: {practitioner.tags.map((tag, i) => <span key={i}>{tag}</span>)}</p>
        </div>
      </div>
      <NewReview />
      <Reviews />
    </div>
  );
}
