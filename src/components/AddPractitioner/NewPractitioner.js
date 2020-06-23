import React, { useState } from 'react';
import StarRating from "react-star-ratings";

export default function NewPractitioner() {
  const [starRating, setStarRating] = useState(3);

  return(
    <>
      <form>
        <h1>Add-a-Doc</h1>
        <div>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="employer" />
        <input type="text" placeholder="phone number (xxx-xxx-xxxx)" />
        <input type="text" placeholder="picture" />
        <input type="text" placeholder="bio" />
        <p>Tags</p>
        <label>
          <input type="checkbox" />
          GP
        </label>
        <label>
          <input type="checkbox" />
          Therapist
        </label>
        <label>
          <input type="checkbox" />
          POC
        </label>
        <label>
          <input type="checkbox" />
          Transgender
        </label>
        <label>
          <input type="checkbox" />
          Woman
        </label>
        <label>
          <input type="checkbox" />
          Placeholder
        </label>
        <br />
        <p>Your Rating & Review (optional but helpful!)</p>
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
        <input type="text" placeholder="your review" />
        </div>
      </form>
    </>
  );
}