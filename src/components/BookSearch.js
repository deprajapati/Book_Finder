import React, { useState } from "react";
import BookCard from "./BookCard";

const API_URL = "https://openlibrary.org/search.json?title=";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = data.docs.slice(0, 20);
      if (results.length === 0) {
        setError("❌ No books found with this keyword.");
      }
      setBooks(results);
    } catch (err) {
      setError("⚠️ Failed to fetch books.");
    }
    setLoading(false);
  };

  const handleClear = () => {
    setQuery("");
    setBooks([]);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search for books by title..."
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
            >
              ×
            </button>
          )}
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && books.length > 0 && (
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
