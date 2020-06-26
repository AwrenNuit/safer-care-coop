import React, { useState } from "react";
import StarRating from "react-star-ratings";
import Input from "./Input";

export default function NewPractitioner() {
  const [bio, setBio] = useState("");
  const [employer, setEmployer] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [physician, setPhysician] = useState(false);
  const [POC, setPOC] = useState(false);
  const [queer, setQueer] = useState(false);
  const [therapist, setTherapist] = useState(false);
  const [transgender, setTransgender] = useState(false);
  const [women, setWomen] = useState(false);
  const [starRating, setStarRating] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("asdasdasd");
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Add-a-Doc</h1>
        <div>
          <div>
            <Input
              label="Practitioner Name: "
              placeholder="name"
              setValue={setName}
              type="text"
              value={name}
            />
            <Input
              label="Employer: "
              placeholder="employer"
              setValue={setEmployer}
              type="text"
              value={employer}
            />
            <Input
              label="Phone Number: "
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
            <p>Tags</p>
            <Input
              label="Physician"
              setValue={setPhysician}
              type="checkbox"
              value={physician}
            />
            <Input
              label="Therapist"
              setValue={setTherapist}
              type="checkbox"
              value={therapist}
            />
            <Input label="POC" setValue={setPOC} type="checkbox" value={POC} />
            <Input
              label="Transgender"
              setValue={setTransgender}
              type="checkbox"
              value={transgender}
            />
            <Input
              label="Women"
              setValue={setWomen}
              type="checkbox"
              value={women}
            />
            <Input
              label="Queer"
              setValue={setQueer}
              type="checkbox"
              value={queer}
            />
          </div>

          <div>
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
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </div>
      </form>
    </>
  );
}
