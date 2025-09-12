import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Book with Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="#2563EB"
          style={{ marginRight: "0.6em" }}
        >
          <path d="M4 3h13a1 1 0 0 1 1 1v9.08a6.5 6.5 0 0 0-8.9 8.92H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 5H6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2zm0 4H6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2zm12.71 7.29-2.4-2.39A4.5 4.5 0 1 0 15.5 20a4.48 4.48 0 0 0 2.77-1l2.39 2.4a1 1 0 0 0 1.42-1.42zM15.5 18a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
        <span className="navbar-title">BOOK FINDER</span>
      </div>
    </nav>
  );
}

export default Navbar;
