import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import "./AddTag.css";
import Input from "../AddPractitioner/Input";
import { Context } from "../App/App";

export default function AddTag(props) {
  const { state, dispatch } = useContext(Context);
  const [tags, setTags] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const filterLabels = [
      "BIPOC",
      "Disabled",
      "Fat",
      "Queer",
      "Transgender",
      "Women",
    ];
    for (let label of filterLabels) {
      if (!Object.values(props.tags).includes(label)) {
        setLabels((labels) => [...labels, label]);
      }
    }
  }, []);

  const addTag = (e) => {
    e.preventDefault();
    for (let tag of tags) {
      const randomID = Math.random().toString(36).substr(2, 13);
      db.ref(`${props.name}/tags`).update({
        [Object.values(props.tags).length + randomID]: tag,
      });
    }
    updatePractitioner();
    props.closeModal();
  };

  const handleTagChange = (e, tag) => {
    if (e) {
      setTags((tags) => [...tags, tag]);
    } else {
      setTags(tags.filter((item) => item !== tag));
    }
  };

  const updatePractitioner = () => {
    db.ref(props.name).once("value", (snapshot) => {
      dispatch({ type: `SET_DOCTOR`, payload: snapshot.val() });
    });
  };

  return (
    <>
      <div id="modal-greyout" onClick={props.closeModal}></div>
      <div id="modal-container">
        <span id="modal-x" onClick={props.closeModal}>
          x
        </span>
        <form onSubmit={addTag}>
          <h2 style={{ textAlign: "center" }}>Add-a-Tag</h2>
          <div style={{ marginTop: "1rem" }}>
            {labels.map((item, i) => (
              <Input
                handleChange={handleTagChange}
                key={i}
                label={item}
                type="checkbox"
              />
            ))}
          </div>
          <button
            type="submit"
            style={{ display: "block", margin: "0 auto", width: "100%" }}
          >
            Add Tags
          </button>
        </form>
      </div>
    </>
  );
}
