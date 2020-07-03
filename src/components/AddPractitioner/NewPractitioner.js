import React, { useState, useContext } from "react";
import { db } from "../../firebase";
import { Context } from "../App/App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRating from "react-star-ratings";
import "./NewPractitioner.css";
import Input from "./Input";
import { useHistory } from "react-router-dom";

export default function NewPractitioner() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const [bio, setBio] = useState("");
  const [employer, setEmployer] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [review, setReview] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [starRating, setStarRating] = useState(3);
  const [tags, setTags] = useState([]);
  const day = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();
  const date = `${month} ${day}, ${year}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(state.allPractitioners).includes(name)) {
      if (name && employer && phoneNumber) {
        if (tags.includes("Physician") || tags.includes("Therapist")) {
          if (starRating && review) {
            postWithRatingAndReview();
            thankAndRedirect();
          } else if (starRating) {
            postWithRating();
            thankAndRedirect();
          } else if (review) {
            postWithReview();
            thankAndRedirect();
          } else {
            PostWithNoReviewOrRating();
            thankAndRedirect();
          }
        } else {
          toast("🛑 Please select 'Physician' or 'Therapist' tag.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast(
          "🛑 Please enter practitioner Name, Employer, and Phone Number.",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      toast("🛑 That practitioner is already in the system", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleTagChange = (e, tag) => {
    if (e) {
      if (tag !== "Physician" && tag !== "Therapist") {
        setTags((tags) => [...tags, tag]);
      } else if (tag === "Physician" && !tags.includes("Physician")) {
        setTags(tags.filter((item) => item !== "Therapist"));
        setTimeout(() => setTags((tags) => [...tags, tag]), 10);
      } else if (tag === "Therapist" && !tags.includes("Therapist")) {
        setTags(tags.filter((item) => item !== "Physician"));
        setTimeout(() => setTags((tags) => [...tags, tag]), 10);
      }
    } else {
      setTags(tags.filter((item) => item !== tag));
    }
  };

  const postRating = () => {
    db.ref(`${name}/ratings`).update({
      [new Date()]: starRating,
    });
  };

  const postReview = () => {
    db.ref(`${name}/reviews`)
      .push()
      .set({
        date: date,
        name: reviewName || "Anonymous",
        rating: starRating,
        review: review,
      });
  };

  const PostWithNoReviewOrRating = () => {
    db.ref(name).set({
      bio,
      employer,
      image,
      name,
      numRatings: 0,
      phone: phoneNumber,
      ratings: [],
      reviews: [],
      tags: tags,
    });
  };

  const postWithRating = async () => {
    await db.ref(name).set({
      bio,
      employer,
      image,
      name,
      numRatings: 1,
      phone: phoneNumber,
      ratings: [],
      reviews: [],
      tags: tags,
    });
    postRating();
  };

  const postWithRatingAndReview = async () => {
    await db.ref(name).set({
      bio,
      employer,
      image,
      name,
      numRatings: 1,
      phone: phoneNumber,
      ratings: [],
      reviews: [],
      tags: tags,
    });
    postRating();
    postReview();
  };

  const postWithReview = async () => {
    await db.ref(name).set({
      bio,
      employer,
      image,
      name,
      numRatings: 0,
      phone: phoneNumber,
      ratings: [],
      reviews: [],
      tags: tags,
    });
    postReview();
  };

  const thankAndRedirect = () => {
    dispatch({ type: `SHOW_TOAST` });
    history.push("/");
  };

  return (
    <div
      className="main-container"
      style={{ margin: "0 auto", maxWidth: "630px" }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-content-container">
          <h1 style={{ textAlign: "center" }}>Add-a-Doc</h1>
          <div>
            {/* set requirements met prop to change color */}
            <Input
              label="Practitioner Name"
              placeholder="name"
              required={true}
              setValue={setName}
              type="text"
              value={name}
            />
            <Input
              label="Employer"
              placeholder="employer name"
              required={true}
              setValue={setEmployer}
              type="text"
              value={employer}
            />
            <Input
              label="Phone Number"
              placeholder="xxx-xxx-xxxx"
              required={true}
              setValue={setPhoneNumber}
              type="text"
              value={phoneNumber}
            />
            <Input
              label="Picture"
              placeholder="image url"
              setValue={setImage}
              type="text"
              value={image}
            />
            <div style={{ marginTop: "20px" }}>
              <label>Background & Services: </label>
              <textarea
                className="form-textarea"
                onChange={(e) => setBio(e.target.value)}
                placeholder="what this person does"
                rows="6"
                value={bio}
              ></textarea>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h2>Tags</h2>
            <p style={{ fontWeight: "bold", margin: "20px 0 10px 0" }}>
              Select One (required)
            </p>
            <Input
              handleChange={handleTagChange}
              label="Physician"
              name="doc-type"
              type="radio"
            />
            <Input
              handleChange={handleTagChange}
              label="Therapist"
              name="doc-type"
              type="radio"
            />
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Select Any (optional)
            </p>
            <Input
              handleChange={handleTagChange}
              label="BIPOC"
              type="checkbox"
            />
            <Input
              handleChange={handleTagChange}
              label="Transgender"
              type="checkbox"
            />
            <Input
              handleChange={handleTagChange}
              label="Women"
              type="checkbox"
            />
            <Input
              handleChange={handleTagChange}
              label="Queer"
              type="checkbox"
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <h2>Your Rating & Review</h2>
            <p>** Optional but helpful! **</p>
            <Input
              label="Your Name: "
              placeholder="your name (optional)"
              setValue={setReviewName}
              type="text"
              value={reviewName}
            />
            <div style={{ marginTop: "20px" }}>
              <label>Rating: </label>
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
            <div style={{ marginTop: "20px" }}>
              <label>Review: </label>
              <textarea
                className="form-textarea"
                onChange={(e) => setReview(e.target.value)}
                placeholder="your review"
                rows="6"
                value={review}
              ></textarea>
            </div>
          </div>
          <div>
            <button type="submit" className="form-btn">
              SUBMIT
            </button>
          </div>
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
    </div>
  );
}
