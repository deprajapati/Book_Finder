import React, { useState } from "react";
import BookCard from "./BookCard";
import Modal from "./Modal";

const API_URL = "https://openlibrary.org/search.json?title=";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const fetchBooks = async (searchQuery, pageNumber, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}${encodeURIComponent(searchQuery)}&page=${pageNumber}&limit=50`
      );
      const data = await res.json();
      const results = data.docs;
      if (results.length === 0 && pageNumber === 1) {
        setError("❌ No books found with this keyword.");
      }
      setBooks(prevBooks =>
        append ? [...prevBooks, ...results] : results
      );
      // OpenLibrary returns "numFound" for total results
      setHasMore(pageNumber * 500 < data.numFound);
      setTotalResults(data.numFound);
    } catch (err) {
      setError("⚠️ Failed to fetch books.");
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(1);
    fetchBooks(query, 1, false);
  };

  const handleClear = () => {
    setQuery("");
    setBooks([]);
    setError(null);
    setPage(1);
    setHasMore(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(query, nextPage, true);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search for books by title..."
            required
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

      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}

      {totalResults > 0 && (
        <div style={{ textAlign: "center", margin: "1em 0", color: "#4F46E5" }}>
          Showing {books.length} out of {totalResults} results
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <div className="book-list">
            {books.map((book) => (
              <BookCard
                key={book.key + (book.cover_i || "")}
                book={book}
                onClick={() => handleBookClick(book)}
              />
            ))}
          </div>
          {hasMore && (
            <div style={{ textAlign: "center", margin: "1em 0" }}>
              <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      <Modal visible={!!selectedBook} onClose={handleCloseModal}>
        {selectedBook && (
          <div className="book-detail">
            <img
              src={
                selectedBook.cover_i
                  ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`
                  : "https://via.placeholder.com/150x220?text=No+Cover"
              }
              alt={selectedBook.title}
              className="detail-img"
            />
            <h2>{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author_name ? selectedBook.author_name.join(", ") : "Unknown"}</p>
            <p><strong>First Published:</strong> {selectedBook.first_publish_year || "N/A"}</p>
            {selectedBook.publisher && (
              <p><strong>Publisher:</strong> {selectedBook.publisher.join(", ")}</p>
            )}
            {selectedBook.subject && (
              <p><strong>Subjects:</strong> {selectedBook.subject.slice(0, 5).join(", ")}</p>
            )}
            <a
              href={`https://openlibrary.org${selectedBook.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-link"
            >
              View more Details on OpenLibrary
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default BookSearch;