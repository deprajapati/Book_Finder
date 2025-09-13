import React, { useEffect, useState } from "react";

const API_URL = "https://openlibrary.org/search.json?q=";

// Some random keywords to get variety
const RANDOM_KEYWORDS = [
  "love",
  "adventure",
  "science",
  "history",
  "fantasy",
  "magic",
  "technology",
  "art",
  "philosophy",
  "travel"
];

function SuggestionBooks({ onBookClick }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // Pick a random keyword each time
        const randomKeyword =
          RANDOM_KEYWORDS[Math.floor(Math.random() * RANDOM_KEYWORDS.length)];

        const res = await fetch(`${API_URL}${randomKeyword}&limit=6`);
        const data = await res.json();
        setSuggestions(data.docs || []);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };
    fetchSuggestions();
  }, []); // runs once when component mounts

  if (suggestions.length === 0) return null;

  return (
    <div className="suggestion-books">
      <h3 style={{ textAlign: "center", marginTop: "2em" }}>✨ Suggested Books</h3>
      <div className="book-list">
        {suggestions.map((book) => (
          <div
            key={book.key}
            className="book-card"
            onClick={() => onBookClick(book)}
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/120x180?text=No+Cover"
              }
              alt={book.title}
            />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionBooks;
