import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';
const Landing = () => {
  return (
    <div className="landing">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
            <div className="typewriter max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Best Social Media <br className="block sm:hidden" /> Plateform
                over <br className="block sm:hidden" />
                <h1 className=" inline-block text-blue-600">Entire Internet</h1>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Eventually everything connects – people, ideas, objects. The
                quality of the connections is the key to quality per se.
              </p>
            </div>
            <hr className="mb-6 border-gray-300" />
          </div>
          <div className="px-5 pt-6 pb-5 text-center border border-gray-300 rounded lg:w-2/5">
            <div className="mb-5 font-semibold">Create an account</div>
            <div className="flex justify-center w-full mb-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-sky-500 hover:bg-cyan-400 focus:shadow-outline focus:outline-white"
              >
                <div className="flex items-center">
                  <div className="mr-3 font-semibold text-white">
                    Login to Continue
                  </div>
                </div>
              </Link>
            </div>
            <p className="max-w-md px-5 mb-3 text-xs text-gray-600 sm:text-sm md:mb-5">
              Explore the World of Software Developers
            </p>
            <div className="flex items-center w-full mb-5">
              <hr className="flex-1 border-gray-300" />
              <div className="px-3 text-xs text-gray-500 sm:text-sm">or</div>
              <hr className="flex-1 border-gray-300" />
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center hover:bg-black hover:text-white justify-center w-full h-12 text-gray-700 px-6 font-bold transition duration-200 bg-white border border-gray-300 rounded md:w-auto  focus:shadow-outline focus:outline-none"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
