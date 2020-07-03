import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { Context } from "../App/App";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

export default function Home() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    db.ref().once("value", (snapshot) => {
      dispatch({ type: `SET_PRACTITIONERS`, payload: snapshot.val() });
    });
  }, []);

  useEffect(() => {
    if (state.toast) {
      toast("💜 Thank you for contributing!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => dispatch({ type: `CLEAR_TOAST` }), 5000);
    }
  }, []);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
        Making Healthcare Safer
      </h1>
      <p>
        People who hold oppressed or marginalized identities often experience
        significant discrimination from healthcare workers. This results in
        worse overall healthcare, less visits to the doctor, and sometimes
        traumatic experiences or death. The system as it exists simply will not
        do.
      </p>
      <br />
      <p>
        The goal of [Safer Healthcare] is to make it easier for people who hold
        these identities to find a healthcare practitioner in the Minneapolis
        area who will provide better care.
      </p>
      <br />
      <p>
        Start by using the search area up top. If you've seen an excellent
        practitioner feel free to add them to the list{" "}
        <Link style={{ color: "#c929c9", cursor: "pointer" }} to="/add-a-doc">
          HERE
        </Link>
        .
      </p>
      <br />
      <br />
      <p id="get-involved">
        If you want to get involved with this, feel free to{" "}
        <a
          href="https://github.com/AwrenNuit/safer-community-healthcare"
          rel="noopener noreferrer"
          style={{ color: "#c929c9" }}
          target="_blank"
        >
          FORK THE REPO
        </a>{" "}
        and make a Pull Request. I would love to improve the website's features,
        aesthetics, and the user experience. Please{" "}
        <a
          href="mailto:awren.nuit@gmail.com?subject=RE: Safer Healthcare"
          style={{ color: "#c929c9" }}
        >
          EMAIL ME
        </a>{" "}
        with any suggestions or questions.
      </p>
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
