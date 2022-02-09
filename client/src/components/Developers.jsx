import React from "react";
import { fetchDevelopers } from "../redux/authentications/authUser";
import { Link } from "react-router-dom";
const Developers = () => {
  const [developers, setDevelopers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetchDevelopers().then((res) => {
      setDevelopers(res);
      setIsLoading(false);
    });
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
      <div className="mb-16">
        <dh-component>
          <div className="container flex justify-center mx-auto pt-10">
            <div>
              <p className="text-green-400 f text-lg text-center font-semi-bold pb-3">
                The Talented People Behind the Scenes of the Organization
              </p>
              <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-2 sm:w-4/6 w-5/6 mx-auto">
               Developers
              </h1>
              <div className="flex mb-2 justify-center">
                <div className="w-40 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 inline-flex"></div>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-100 px-10 pt-10">
            <div className="container mx-auto">
              <div
                role="list"
                aria-label="Behind the scenes People "
                className="lg:flex md:flex sm:flex items-center  flex-wrap md:justify-around sm:justify-around"
              >
                {developers.map((developer) => {
                  return (
                    <div
                      key={developer._id}
                      role="listitem"
                      className=" xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
                    >
                      <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center">
                          <div className="h-32 w-32">
                            <img
                              src={developer.user.avatar}
                              alt="Profile"
                              className="rounded-full object-cover h-full w-full shadow-md"
                            />
                          </div>
                        </div>
                        <div className="px-6 mt-16">
                          <h1 className="font-bold text-3xl text-center mb-1">
                            {developer.user.name}
                          </h1>
                          <p className="text-gray-800 text-sm text-center">
                            {developer.status}
                          </p>
                          <p className="text-center text-gray-600 text-base pt-3 font-normal">
                            {developer.bio}
                          </p>
                          <div className="w-full flex justify-center pt-5 pb-5">
                            <Link
                              to={`/profile/${developer.handle}`}
                              className=" rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </dh-component>
      </div>
    </div>
  );
};

export default Developers;
