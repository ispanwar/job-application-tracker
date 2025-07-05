import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className=" mx-auto px-6 py-3 flex items-center justify-between flex-wrap">
        <h1 className="text-xl font-bold">Job Application Tracker</h1>

        {/* Hamburger button for small screens */}
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {/* Hamburger icon */}
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              // X icon when menu is open
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3 5.71a1 1 0 0 0-1.42-1.42L12 9.17 7.12 4.29A1 1 0 1 0 5.7 5.71L10.59 10.6 5.7 15.49a1 1 0 1 0 1.42 1.42L12 12.83l4.88 4.88a1 1 0 0 0 1.42-1.42L13.41 10.6l4.89-4.89z"
              />
            ) : (
              // Hamburger lines when menu is closed
              <path
                fillRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 mt-3 md:mt-0 text-lg font-semibold">
            <Link
              to="/"
              className="block px-3 py-2 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobpage"
              className="block px-3 py-2 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Job Page
            </Link>
            <Link
              to="/kanban"
              className="block px-3 py-2 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Kanban Board
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
