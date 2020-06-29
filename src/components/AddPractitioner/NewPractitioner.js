import React, { useState, useContext } from "react";
import { db } from "../../firebase";
import { Context } from "../App/App";
import StarRating from "react-star-ratings";
import "./NewPractitioner.css";
import Input from "./Input";

export default function NewPractitioner() {
  const { state, dispatch } = useContext(Context);
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
    console.log("state:", Object.keys(state.allPractitioners));
    if (!Object.keys(state.allPractitioners).includes(name)) {
      if (name && employer && phoneNumber) {
        if (tags.includes("Physician") || tags.includes("Therapist")) {
          if (starRating && review) {
            postWithRatingAndReview();
          } else if (starRating) {
            postWithRating();
          } else if (review) {
            postWithReview();
          } else {
            PostWithNoReviewOrRating();
          }
        } else {
          alert(`Please select 'Physician' or 'Therapist' tag.`);
        }
      } else {
        alert(`Please enter practitioner Name, Employer, and Phone Number.`);
      }
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
            <Input
              label="Background & Services"
              placeholder="what this person does"
              setValue={setBio}
              type="text"
              value={bio}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <h2>Tags</h2>
            <p>Select One (required)</p>
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
            <p>Select Any (optional)</p>
            <Input handleChange={handleTagChange} label="POC" type="checkbox" />
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
            <p>* Optional but helpful! *</p>
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
                onChange={(e) => setReview(e.target.value)}
                placeholder="your review"
                rows="6"
                style={{ width: "100%" }}
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
    </div>
  );
}
