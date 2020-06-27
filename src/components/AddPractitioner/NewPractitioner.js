import React, { useState, useContext } from "react";
import { db } from "../../firebase";
import { Context } from "../App/App";
import StarRating from "react-star-ratings";
import Input from "./Input";

export default function NewPractitioner() {
  const { state, dispatch } = useContext(Context);
  const [bio, setBio] = useState("");
  const [employer, setEmployer] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [review, setReview] = useState("");
  const [starRating, setStarRating] = useState(3);
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state:", Object.keys(state.allPractitioners));
    if (!Object.keys(state.allPractitioners).includes(name)) {
      if (name && employer && phoneNumber) {
        if (tags.includes("Physician*") || tags.includes("Therapist*")) {
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
      setTags((tags) => [...tags, tag]);
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
    db.ref(`${props.thisPractitioner}/reviews`)
      .push()
      .set({
        date: date,
        name: name || "Anonymous",
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
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Add-a-Doc</h1>
        <div>
          <div>
            <p>*Name, Employer, and Phone Number required*</p>
            {/* set required prop for some */}
            <Input
              label="Practitioner Name*: "
              placeholder="name"
              setValue={setName}
              type="text"
              value={name}
            />
            <Input
              label="Employer*: "
              placeholder="employer"
              setValue={setEmployer}
              type="text"
              value={employer}
            />
            <Input
              label="Phone Number*: "
              placeholder="xxx-xxx-xxxx"
              setValue={setPhoneNumber}
              type="text"
              value={phoneNumber}
            />
            <Input
              label="Picture: "
              placeholder="image url"
              setValue={setImage}
              type="text"
              value={image}
            />
            <Input
              label="Background & Services: "
              placeholder="background"
              setValue={setBio}
              type="text"
              value={bio}
            />
          </div>

          <div>
            <h2>Tags</h2>
            <p>*Physician or Therapist required*</p>
            <Input
              handleChange={handleTagChange}
              label="Physician*"
              type="checkbox"
            />
            <Input
              handleChange={handleTagChange}
              label="Therapist*"
              type="checkbox"
            />
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

          <div>
            <h2>Your Rating & Review</h2>
            <p>*Optional but helpful!*</p>
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
            <Input
              label="Review: "
              placeholder="your review"
              setValue={setReview}
              type="text"
              value={review}
            />
          </div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </div>
      </form>
    </>
  );
}
