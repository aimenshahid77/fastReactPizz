import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const userName = useSelector((state) => state.user.value);

  return (
    <header className="bg-yellow-500 flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-white text-2xl md:text-3xl font-extrabold font-poppins tracking-tight">
          Fast React Pizza
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <input
          id="pizza-search"
          type="text"
          placeholder="Search Order #"
          className="w-48 md:w-64 px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm placeholder-gray-100 text-black"
        />
        {userName && (
          <span className="text-white font-medium text-sm md:text-base">
            Welcome, <span className="font-semibold">{userName}</span>!
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
