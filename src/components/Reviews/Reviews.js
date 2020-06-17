import React from "react";
import StarRating from "react-star-ratings";

export default function Reviews() {
  return (
    // this data will be mapped through
    <div
      style={{
        border: "3px solid black",
        marginTop: "1.5rem",
        padding: "1rem",
      }}
    >
      <div style={{ float: "right" }}>
        <StarRating
          name="rating"
          numberOfStars={5}
          rating={3} // use actual review rating
          starDimension="30px"
          starRatedColor="gold"
          starSpacing="0"
        />
      </div>
      <p>name (or default anonymous)</p>
      <p>date</p>
      <br />
      <p>
        This is where the review of this practitioner goes. How are they? Did I
        enjoy my visit? Would I recommend them to someone else? Were they great?
        Terrible? This space is where I let the world know.
      </p>
    </div>
  );
}
