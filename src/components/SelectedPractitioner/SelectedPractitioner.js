import React, { useContext } from "react";
import './SelectedPractitioner.css';
import { Context } from "../App/App";
import StarRating from 'react-star-ratings';
import Reviews from "../Reviews/Reviews";
import NewReview from "../NewReview/NewReview";

export default function SelectedPractitioner() {
  const { state, dispatch } = useContext(Context);

  return (
    <div className="main-container">
      <h1>{state.name}</h1>
      <div id="selected-grid">
        <img id="selected-img" src={state.image} alt="" />
        <div>
          <p>{state.employer}</p>
          <StarRating
            name='rating'
            numberOfStars={5}
            rating={state.rating}
            starDimension="20px"
            starRatedColor="gold"
            starSpacing="0"
          />
          <p>{state.bio}</p>
          <p>Tags: {state.tags.map((tag, i) => <span key={i}>{tag}</span>)}</p>
        </div>
      </div>
      <NewReview />
      <Reviews />
    </div>
  );
}
