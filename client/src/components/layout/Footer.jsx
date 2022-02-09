import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"
const Footer = () => {
  return (
    <div >
      <footer className="hidden mt-3 lg:block  footer w-full  py-8 bg-white  text-2 text-gray-900  transition-colors duration-200">
        <div className=" flex flex-col">
          <div className="md:hidden mt-7 mx-auto w-11 h-px rounded-full"></div>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row">
            <nav className="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-100 md:pr-5">
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
            </nav>

            <div className="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
              <span className="">
                {" "}
                © 2022 Social Media Platform for Developers — Sherry.
              </span>
              <span className="mt-7 md:mt-1"></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
