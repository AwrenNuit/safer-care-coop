import React, { useState } from "react";
import StarRating from 'react-star-ratings';

export default function Reviews() {
  const [starRating, setStarRating] = useState(3);
  
  return (
    // this data will be mapped through
    <div style={{border:"3px solid black", padding: "1rem"}}>
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
