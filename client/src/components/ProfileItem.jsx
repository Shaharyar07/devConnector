import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { developerProfile } from "../redux/authentications/authUser";
import "../App.css";

const ProfileItem = () => {
  const { handle } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [gitData, setGitData] = useState({});
  useEffect(() => {
    const fetchDeveloper = async () => {
      const data = await developerProfile(handle);

      setProfile(data);
      setLoading(false);
      fetch(`https://api.github.com/users/${data.gitUsername}`).then((res) => {
        res.json().then((gitdata) => {
          setGitData(gitdata);
        });
      });
    };
    fetchDeveloper();
    
  }, []);

  if (loading) {
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
    <div className="mx-5 my-3">
      <Link
        to="/developers"
        className=" lg:back sm:m-2 rounded-lg py-2 px-4   bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
      >
        Back to Developers
      </Link>
      <div className="bg-white sm:text-center  text-gray-900 w-full py-10 px-10">
        <div>
          <div className="  sm:flex space-x-7 border justify-center py-6 align-center md:items-start items-center">
            <div className="mb-4">
              <img
                className="rounded-md md:w-80"
                src={profile.user.avatar}
                alt={profile.user.name}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold my-2"> {profile.user.name}</h1>
              <p className=" text-lg tracking-wide mb-6 md:max-w-lg">
                {profile.bio}
              </p>
              <button
                onClick={() => {
                  window.open(
                    `https://github.com/${profile.gitUsername}`,
                    "_blank"
                  );
                }}
                className="font-bold text-green-400 hover:border-none border-2 px-6 py-4 rounded-md border-blue-500  hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white transition duration-75"
              >
                VISIT GITHUB PROFILE
              </button>
              <Link
                to={"/chat"}
                className="mx-2 hidden sm:inline-block font-bold text-green-400  hover:border-none border-2 px-6 py-4 rounded-md border-blue-500  hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white transition duration-75"
              >
                CHAT WITH {profile.user.name}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:grid grid-cols-3 sm:space-x-4">
          <div className="bg-slate-600 p-6 rounded-md mb-4">
            <span className="text-slate-400 text-md">Location</span>
            <h2 className="text-slate-100 text-2xl font-semibold">
              {profile.location}
            </h2>
          </div>
          <div className="bg-slate-600 p-6 rounded-md mb-4">
            <span className="text-slate-400 text-md">Website</span>
            <h2 className="text-slate-100 text-2xl font-semibold">
              {profile.website}
            </h2>
          </div>
          <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
            <div>
              <span className="text-md text-slate-400">Github following</span>
              <h1 className="text-3xl font-bold text-slate-100">
                {gitData.following}
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="sm:grid lg:grid-cols-4 grid-cols-2 sm:gap-x-4">
          <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
            <div>
              <span className="text-md text-slate-400">Company</span>
              <h1 className="text-3xl font-bold text-slate-100">
                {profile.company}
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
            <div>
              <span className="text-md text-slate-400">Status</span>
              <h1 className="text-3xl font-bold text-slate-100">
                {profile.status}
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
            <div>
              <span className="text-md text-slate-400">Public Rpos</span>
              <h1 className="text-3xl font-bold text-slate-100">
                {gitData.public_repos}
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
            <div>
              <span className="text-md text-slate-400">Github followers</span>
              <h1 className="text-3xl font-bold text-slate-100">
                {gitData.followers}
              </h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
