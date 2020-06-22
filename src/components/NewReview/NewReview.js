import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "react-star-ratings";
import { db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function NewReview(props) {
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
    postRating(Math.random().toString(36).substr(2, 13));
    thankAndRedirect();
  };

  const incrementNumberOfRatings = () => {
    db.ref(`${props.thisPractitioner}/numRatings`).transaction(
      (currentValue) => {
        return (currentValue || 0) + 1;
      }
    );
  };

  const postRating = (randomID) => {
    db.ref(`${props.thisPractitioner}/ratings`).update({
      [new Date() + randomID]: starRating,
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
    toast('💜 Thank you for contributing!', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/");
  };

  return (
    <>
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
