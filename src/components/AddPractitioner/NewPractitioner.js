import React, { useState } from "react";
import StarRating from "react-star-ratings";
import TextInput from "./TextInput";

export default function NewPractitioner() {
  const [bio, setBio] = useState("");
  const [employer, setEmployer] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [starRating, setStarRating] = useState(3);

  const handleChange = (e, updateState) => updateState(e);

  return (
    <>
      <form>
        <h1>Add-a-Doc</h1>
        <div>
          <TextInput
            thisValueSet={setName}
            label="Practitioner Name: "
            handleChange={handleChange}
            placeholder="name"
            type="text"
            value={name}
          />
          <TextInput
            thisValueSet={setEmployer}
            label="Employer: "
            handleChange={handleChange}
            placeholder="employer"
            type="text"
            value={employer}
          />
          <TextInput
            thisValueSet={setPhoneNumber}
            label="Phone Number: "
            handleChange={handleChange}
            placeholder="xxx-xxx-xxxx"
            type="text"
            value={phoneNumber}
          />
          <TextInput
            thisValueSet={setImage}
            label="Picture: "
            handleChange={handleChange}
            placeholder="image url"
            type="text"
            value={image}
          />
          <TextInput
            thisValueSet={setBio}
            label="Background & Services: "
            handleChange={handleChange}
            placeholder="background"
            type="text"
            value={bio}
          />

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
