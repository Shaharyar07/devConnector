import React, { useState, useEffect } from "react";
import "../App.css";
import { Authenticate, AddExperience } from "../redux/authentications/authUser";
import { useNavigate, Link } from "react-router-dom";
const Experience = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [experience, setExperience] = useState({});
const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    AddExperience(experience);

    navigate("/dashboard");
  };
  const handleChange = (e) => {
    e.preventDefault();
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await Authenticate();
      setUser(user);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div className="bg-white w-1/2 mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
        <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
        <div className="flex flex-col flex-1 gap-5 sm:p-2">
          <div className="flex flex-1 flex-col gap-3">
            <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
          </div>
          <div className="mt-auto flex gap-3">
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Link
        to="/dashboard"
        className="m-10 rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
      >
        Back to Dashboard
      </Link>
      <div className="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
        <div className="top h-64 w-full bg-blue-600 overflow-hidden relative">
          <p className="bg w-full h-full bg-gradient-to-r from-green-400 to-blue-500 object-cover object-center absolute z-0" />
          <div className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
            <img
              src={user.user.avatar}
              alt="user"
              className="h-24 w-24 object-cover rounded-full"
            />
            <h1 className="text-2xl font-semibold">{user.user.name}</h1>
            <h4 className="text-sm font-semibold">{user.user.email}</h4>
          </div>
        </div>
        <div className="grid grid-cols-12 bg-white ">
          <div className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
            <p className="p-2 text-green-400 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500 text-center rounded font-bold">
              Add Your experience Details
            </p>
          </div>

          <div className="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10">
            <div className="px-4 pt-4">
              <form
                action="#"
                className="flex flex-col space-y-8"
                onSubmit={handleSubmit}
              >
                <div>
                  <h3 className="text-2xl font-semibold">Experience</h3>
                  <hr />
                </div>

                <div className="form-item">
                  <label className="text-xl ">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    onChange={handleChange}
                    placeholder="Enter your Job title here"
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                  />
                </div>

                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                  <div className="form-item w-full">
                    <label className="text-xl ">Company</label>
                    <input
                      type="text"
                      required
                      name="company"
                      onChange={handleChange}
                      placeholder="Enter your Company name here"
                      className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                    />
                  </div>
                  <div className="form-item w-full">
                    <label className="text-xl ">Location</label>
                    <input
                      type="text"
                      name="location"
                      onChange={handleChange}
                      required
                      placeholder="Enter location here"
                      className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                    />
                  </div>
                </div>

                <div className="form-item w-full">
                  <label className="text-xl ">From</label>
                  <input
                    type="date"
                    name="from"
                    onChange={handleChange}
                    required
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>
                <div className="form-item w-full">
                  <label className="text-xl ">To</label>
                  <input
                    type="date"
                    name="to"
                    onChange={handleChange}
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                  <label className="mt-5 flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      name="current"
                      className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-gradient-to-r from-green-400 to-blue-500 checked:border-transparent focus:outline-none"
                    />
                    <span className="text-gray-700  font-bold">Current</span>
                  </label>
                </div>

                <div className="form-item w-full">
                  <label className="text-xl ">Job Description</label>
                  <textarea
                    rows="2"
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter program description here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mt-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Add experience
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
