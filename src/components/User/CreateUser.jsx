import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../../redux/slices/userSlice";

const CreateUser = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserName(name));
    navigate("/menu");
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center "
        onSubmit={handleSubmit}
      >
        <input
          className="ml-4 px-3 py-2 rounded-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-2xl mt-5 w-96"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="customername"
          minLength={4}
          maxLength={7}
        />
        {name && (
          <button
            type="submit"
            className="mt-5 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300"
          >
            Order Now
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateUser;
