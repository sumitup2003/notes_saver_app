import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-6 p-4 bg-gray-800 text-white">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg ${
            isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-3 py-2 rounded-lg ${
            isActive ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
          }`
        }
      >
        Pastes
      </NavLink>
    </nav>
  );
};

export default Navbar;
