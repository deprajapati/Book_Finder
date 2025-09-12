import React from "react";

function BookCard({ book }) {
  const coverImg = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/120x180?text=No+Cover";
  return (
    <div className="book-card">
      <img src={coverImg} alt={book.title} />
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author_name ? book.author_name.join(", ") : "Unknown"}
      </p>
      <p>
        <strong>Year:</strong> {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}
export default BookCard;