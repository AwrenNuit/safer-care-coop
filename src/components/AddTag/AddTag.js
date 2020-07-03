import React, { useState } from "react";
import { db } from "../../firebase";
import "./AddTag.css";
import Input from "../AddPractitioner/Input";

export default function AddTag(props) {
  const [tags, setTags] = useState([]);

  const addTag = () => {
    for (let tag of tags) {
      const randomID = Math.random().toString(36).substr(2, 13);
      db.ref(`${props.name}/tags`).update({
        [new Date() + randomID]: tag,
      });
    }
  };

  const handleTagChange = (e, tag) => {
    if (e) {
      setTags(tags.filter((item) => item !== tag));
    }
  };

  return (
    <div>
      <div>
        <h2>Add-a-Tag</h2>
        <div>
          <Input handleChange={handleTagChange} label="BIPOC" type="checkbox" />
          <Input
            handleChange={handleTagChange}
            label="Disabled"
            type="checkbox"
          />
          <Input handleChange={handleTagChange} label="Fat" type="checkbox" />
          <Input handleChange={handleTagChange} label="Queer" type="checkbox" />
          <Input
            handleChange={handleTagChange}
            label="Transgender"
            type="checkbox"
          />
          <Input handleChange={handleTagChange} label="Women" type="checkbox" />
        </div>
      </div>
    </div>
  );
}