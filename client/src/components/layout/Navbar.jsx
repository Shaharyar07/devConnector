import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedOut } from "../../redux/authentications/authSlice";
import { useEffect } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user");

    navigate("/");
    dispatch(loggedOut());
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);
  return (
    <div>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative  grid items-center grid-cols-2 lg:grid-cols-3">
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/developers"
                aria-label="Developers"
                title="Developers"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
              >
                Developers
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                aria-label="About"
                title="About"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
              >
                About
              </Link>
            </li>
            {localStorage.getItem("authtoken") && (
              <li>
                <Link
                  to="/chat"
                  aria-label="Chat"
                  title="Chat"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
                >
                  Chat
                </Link>
              </li>
            )}
          </ul>
          <Link
            to="/"
            aria-label="Devconnector"
            title="Devconnector"
            className="inline-flex items-center lg:mx-auto"
          >
            <svg
              className="w-8 text-blue-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              devConnector
            </span>
          </Link>
          {localStorage.getItem("authtoken") ? (
            <ul className="items-center hidden ml-auto space-x-8 lg:flex">
              <Link
                to="/feed"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
              >
                Newsfeed
              </Link>
              <Link
                to="/dashboard"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Logout
              </button>
            </ul>
          ) : (
            <ul className="items-center hidden ml-auto space-x-8 lg:flex">
              <Link
                to="/login"
                className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                SignUp
              </Link>
            </ul>
          )}
          <div className="ml-auto lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 z-10 left-0 w-full">
                <div className="p-5 bg-white border  rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="devconnector"
                        title="devconnector"
                        className="inline-flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-8 text-blue-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Devconnector
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          to="/developers"
                          aria-label="Developers"
                          title="Developers"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
                        >
                          Developers
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          to="/about"
                          aria-label="About"
                          title="About"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
                        >
                          About
                        </Link>
                      </li>

                      {localStorage.getItem("authtoken") ? (
                        <>
                          <li>
                            <Link
                              onClick={() => setIsMenuOpen(false)}
                              to="/chat"
                              aria-label="Product pricing"
                              title="Product pricing"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
                            >
                              Chat
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setIsMenuOpen(false)}
                              to="/feed"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
                            >
                              Newsfeed
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setIsMenuOpen(false)}
                              to="/dashboard"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-green-400 to-blue-500"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handleLogout();
                              }}
                              className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                            >
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              onClick={() => setIsMenuOpen(false)}
                              to="/login"
                              className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                            >
                              Log In
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setIsMenuOpen(false)}
                              to="/signup"
                              className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                            >
                              SignUp
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
