import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="bg-blue-600 px-6 py-3 text-xl text-white font-semibold shadow-md text-center flex justify-center items-center">
      <h1 className="text-xl font-bold">Job Application Tracker</h1>
      <div className="ml-auto flex space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/jobpage" className="hover:underline">
          Job Page
        </Link>
        <Link to="/kanban" className="hover:underline">
          Kanban Board
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
