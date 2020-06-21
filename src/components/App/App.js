import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Results from "../Results/Results";
import Home from "../Home/Home";
import SelectedPractitioner from "../SelectedPractitioner/SelectedPractitioner";
import { db } from "../../firebase";

export const Context = React.createContext();

const initialState = {
  selectedPractitioner: {
    name: "",
    employer: "",
    rating: 0,
    image: "",
    bio: "",
    tags: [],
    reviews: [],
  },
  allPractitioners: [],
  searchResults: [],
  selectedTag: "",
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_SELECTED_TAG`:
      return { ...state, selectedTag: action.payload };
    case `SET_DOCTOR`:
      return { ...state, selectedPractitioner: action.payload };
    case `SET_PRACTITIONERS`:
      return { ...state, allPractitioners: action.payload };
    case `SET_SEARCH_RESULTS`:
      return { ...state, searchResults: action.payload.flat(Infinity) };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    db.ref().once("value", (snapshot) => {
      dispatch({ type: `SET_PRACTITIONERS`, payload: snapshot.val() });
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/results" component={Results} />
        <Route
          exact
          path="/practitioner/:id"
          component={SelectedPractitioner}
        />
      </Router>
    </Context.Provider>
  );
}
