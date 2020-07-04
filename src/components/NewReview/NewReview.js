import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "react-star-ratings";
import { db } from "../../firebase";
import { Context } from "../App/App";
import "./NewReview.css";

export default function NewReview(props) {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState(3);
  const day = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();
  const date = `${month} ${day}, ${year}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    postReview();
    incrementNumberOfRatings();
    postRating();
    thankAndRedirect();
  };

  const incrementNumberOfRatings = () => {
    db.ref(`${props.thisPractitioner}/numRatings`).transaction(
      (currentValue) => {
        return (currentValue || 0) + 1;
      }
    );
  };

  const postRating = () => {
    const randomID = Math.random().toString(36).substr(2, 13);
    db.ref(`${props.thisPractitioner}/ratings`).update({
      [Object.values(props.ratings).length + randomID]: starRating,
    });
  };

  const postReview = () => {
    db.ref(`${props.thisPractitioner}/reviews`)
      .push()
      .set({
        date: date,
        name: name || "Anonymous",
        rating: starRating,
        review: review,
      });
  };

  const thankAndRedirect = () => {
    dispatch({ type: `SHOW_TOAST` });
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="new-review-box">
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Leave a Review
        </h2>
        <div style={{ float: "right" }}>
          <StarRating
            changeRating={(rating) => setStarRating(rating)}
            isSelectable={true}
            name="rating"
            numberOfStars={5}
            rating={starRating}
            starDimension="30px"
            starHoverColor="gold"
            starRatedColor="gold"
            starSpacing="0"
          />
        </div>
        <input
          className="review-input"
          onChange={(e) => setName(e.target.value)}
          placeholder="name (optional)"
          type="text"
          value={name}
        />
        <br />
        <textarea
          className="form-textarea"
          onChange={(e) => setReview(e.target.value)}
          placeholder="leave review"
          rows="6"
          value={review}
        ></textarea>
        <button
          style={{ display: "block", marginTop: "1rem", width: "100%" }}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
