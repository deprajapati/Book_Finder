import React from "react";
import BookSearch from "./components/BookSearch";
import "./styles.css";

export default function App() {
  return (
    <div className="app-container">
      <h1>Book Finder</h1>
      <BookSearch />
    </div>
  );
}