import React, { useState } from "react";
import StarRating from "react-star-ratings";

export default function NewReview() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState(3);
  const day = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch data to database
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ border: "3px solid black", padding: "1rem" }}>
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
        <p>{`${month} ${day}, ${year}`}</p>
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
