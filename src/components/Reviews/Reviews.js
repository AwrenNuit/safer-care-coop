import React, { Fragment } from "react";
import StarRating from "react-star-ratings";
import './Review.css';

export default function Reviews(props) {
  return (
    <>
      {Object.entries(props.reviews)
        .flat(Infinity)
        .map((item, i) => (
          <Fragment key={i}>
            {item.review ? (
              <div className="review-box">
                <div style={{ float: "right" }}>
                  <StarRating
                    name="rating"
                    numberOfStars={5}
                    rating={item.rating}
                    starDimension="30px"
                    starRatedColor="gold"
                    starSpacing="0"
                  />
                </div>
                <p>{item.name}</p>
                <p>{item.date}</p>
                <br />
                <p>{item.review}</p>
              </div>
            ) : (
              ""
            )}
          </Fragment>
        ))}
    </>
  );
}
