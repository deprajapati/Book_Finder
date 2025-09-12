import React from "react";
import Navbar from "./components/Navbar";
import BookSearch from "./components/BookSearch";
import "./styles.css";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <h1>Find Your Favourite Books Here !</h1>
        <BookSearch />
      </div>
    </>
  );
}
