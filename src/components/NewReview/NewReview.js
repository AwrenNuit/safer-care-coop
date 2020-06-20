import React, { useState } from "react";
import StarRating from "react-star-ratings";
import { db } from "../../firebase";

export default function NewReview(props) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState(3);
  const day = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();
  const date = `${month} ${day}, ${year}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    db.ref(`${props.thisPractitioner}/reviews`).push().set({
        date: date,
        name: name || "Anonymous",
        rating: starRating,
        review: review,
    });
    db.ref(`${props.thisPractitioner}/numRatings`).transaction((currentValue) => {
      return (currentValue || 0) + 1
    });
    db.ref(`${props.thisPractitioner}/ratings`).update({
      [new Date()]: starRating
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          border: "3px solid black",
          marginTop: "2rem",
          padding: "1rem",
        }}
      >
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
          type="text"
          placeholder="name (optional)"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <p>{date}</p>
        <br />
        <textarea
          style={{ width: "100%" }}
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
