import React from "react";
import CreateUser from "../User/CreateUser";
import { useSelector } from "react-redux";
import { Link } from "react-router";



const Hero = () => {
  const userName = useSelector((state) => state.user.value);
  return (
    <main className=" flex items-center flex-col justify-center text-center mt-20">
      <h1 className="text-6xl mt-6 text-black-900">The Best Pizza</h1>
      <h4 className="text-orange-300  text-5xl mt-5 ">
        Straight out of the oven, to you.
      </h4>
      <p className="mt-4 text-4xl text-amber-500 shadow-black-900">
        Welcome, please start by telling us your name:
      </p>

<div className="mt-10">
        {userName ?(
          <>
          <h2 className="text-2xl font-semibold text-black-900">
            Hello, {userName}!


          </h2><Link to="/menu" className="px-6 py-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition duration-300 mt-4">
              <button className=" m-4 h-10 w-40">Continue Ordering!</button>
            </Link>
            </>
          
        ) : (
          <CreateUser />
        )}

      </div>
     
    </main>
  );
};

export default Hero;
