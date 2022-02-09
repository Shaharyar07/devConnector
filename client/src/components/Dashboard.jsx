import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import {
  fetchUser,
  deleteEducation,
  deleteExperience,
  deleteUser,
} from "../redux/authentications/authUser";
const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const deleteEdu = async (id) => {
    const res = await deleteEducation(id);
    setUser({ ...user, education: res.education });
  };
  const deleteExp = async (id) => {
    const res = await deleteExperience(id);
    setUser({ ...user, experience: res.experience });
  };
  const handleDeleteprofile = async () => {
    deleteUser();
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");
    navigate("/");
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchUser();

      setUser(data);
      setLoading(false);
    };
    fetch();
    if (!localStorage.getItem("user")) {
      return setLoading(false);
    }
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

  return localStorage.getItem("user") ? (
    <div className="dashboard  bg-gray-100">
      <div className="">
        <div className="w-full text-white bg-main-color">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"></div>
        </div>

        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src={user.user.avatar}
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 text-center  font-bold text-xl leading-8 my-1">
                  {user.handle}
                </h1>
                <h3 className="px-2 text-gray-600 font-lg text-semibold leading-6">
                  {user.status} at {user.company}.
                </h3>
                <p className="px-2 text-sm text-gray-500 hover:text-gray-600 leading-6">
                  {user.bio}
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{user.date.split("T")[0]}</span>
                  </li>
                </ul>
              </div>

              <div className="my-4"></div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                {show && (
                  <div class="z-20  shadow-lg rounded-2xl p-4 bg-white  w-64 m-auto">
                    <div class="w-full h-full text-center">
                      <div class="flex h-full flex-col justify-between">
                        <svg
                          width="40"
                          height="40"
                          class="mt-4 w-12 h-12 m-auto text-red-500"
                          fill="currentColor"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
                        </svg>
                        <p class="text-gray-800  text-xl font-bold mt-4">
                          Remove card
                        </p>
                        <p class="text-gray-600 dark:text-gray-400  py-2 px-6">
                          Are you sure you want to delete this User ?
                        </p>
                        <div class="flex items-center justify-between gap-4 w-full mt-8">
                          <button
                            onClick={() => handleDeleteprofile()}
                            type="button"
                            class="py-2 px-4  text-white bg-red-500 hover:bg-red-800  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setShow(false)}
                            type="button"
                            class="py-2 px-4 text-green-500 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Name</div>
                      <div className="px-4 py-2">{user.user.name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Status</div>
                      <div className=" py-2">{user.status}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Company</div>
                      <div className=" py-2">{user.company}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div className="px-4 py-2">{user.location}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Github Username
                      </div>
                      <div className="px-4 py-2">{user.gitUsername}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Website</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href={user.website}>
                          {user.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white 0 text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">
                      Skill&#x27;s I have
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                  </div>

                  <ul className="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                    {user.skills.map((skill) => {
                      return (
                        <li
                          className="flex items-start lg:col-span-1"
                          key={skill}
                        >
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <div className="ml-3 text-sm leading-5">{skill}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col my-3   items-center justify-center text-center  ">
                <Link
                  to="/update-profile"
                  className="add edit rounded-lg my-4 py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => setShow(true)}
                  className="add rounded-lg delete my-4  px-4   text-white bg-red-500 hover:bg-red-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Delete Profile
                </button>
                <Link
                  to="/add-experience"
                  className="add flex flex-row  my-4   text-sm p-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-center rounded font-bold"
                >
                  <svg
                    className=" h-5 font-medium tracking-wide text-white transition-colors duration-200 bg-clip-text "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="block">Add Experience</p>
                </Link>
                <Link
                  to="/add-education"
                  className="add flex flex-row  my-4  text-sm p-2 bg-gradient-to-r from-green-400 to-blue-500 text-gray-900 text-center rounded font-bold"
                >
                  <svg
                    className=" h-5 font-medium tracking-wide text-grey-700 transition-colors duration-200 bg-clip-text "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  <p className="text-white">Add Education</p>
                </Link>
              </div>

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid  grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Experience</span>
                    </div>

                    <ul className="list-inside space-y-2">
                      {user.experience.map((experience) => {
                        return (
                          <li key={experience.title}>
                            <div className="text-teal-600">
                              {experience.title} at {experience.company}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {experience.from} - Now
                            </div>
                            <button
                              onClick={() => deleteExp(experience._id)}
                              className="flex flex-row my-5 text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <p>Delete Experience</p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Education</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      {user.education.map((education) => {
                        return (
                          <li key={education.school}>
                            <div className="text-teal-600">
                              {education.degree} in {education.fieldofstudy} at{" "}
                              {education.school}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {education.from} - {education.to}
                            </div>
                            <button
                              onClick={() => deleteEdu(education._id)}
                              className="flex flex-row my-5 text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              <p>Delete Education</p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="m-10 text-center">
      <Link
        to="/create-profile"
        className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
      >
        Create a Profile
      </Link>
    </div>
  );
};

export default Dashboard;
