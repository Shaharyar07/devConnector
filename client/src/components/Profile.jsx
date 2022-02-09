import React, { useState, useEffect } from "react";
import "../App.css";
import { Authenticate, AddProfile } from "../redux/authentications/authUser";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [gitUsername, setGithubusername] = useState("");
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      handle,
      status,
      company,
      website,
      location,
      skills,
      gitUsername,
      bio,
      facebook,
      instagram,
      linkedin,
    };
    console.log("Profile you added", userData);

    const data = await AddProfile(userData);
    console.log("Profile added to database: ", data);
    localStorage.setItem("user", data.user._id);
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await Authenticate();
      setUser(user);
      setLoading(false);
    };
    fetchData();
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
    <div>
      <div className="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
        <div className="top h-64 w-full bg-gradient-to-r from-green-400 to-blue-500 overflow-hidden relative">
          <img
            src=""
            alt=""
            className="bg w-full h-full object-cover object-center absolute z-0"
          />
          <div className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
            <img
              src={user.avatar}
              alt=""
              className="h-24 w-24 object-cover rounded-full"
            />
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <h4 className="text-sm font-semibold">{user.email}</h4>
          </div>
        </div>
        <div className="grid grid-cols-12 bg-white ">
          <div className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
            <p className="text-sm p-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-center rounded font-bold">
              Create your Profile
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
                  <h3 className="text-2xl font-semibold">Basic Information</h3>
                  <hr />
                </div>

                <div className="form-item">
                  <label className="text-xl ">Username</label>
                  <input
                    type="text"
                    onChange={(e) => setHandle(e.target.value)}
                    value={handle}
                    name="handle"
                    required
                    placeholder="Enter your handle here"
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                  />
                </div>

                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                  <div className="form-item w-full">
                    <label className="text-xl ">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={status}
                      required
                      onChange={(e) => setStatus(e.target.value)}
                      placeholder="Enter your current position here"
                      className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                    />
                  </div>
                  <div className="form-item w-full">
                    <label className="text-xl ">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={company}
                      required
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Enter name of your company here"
                      className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                    />
                  </div>
                </div>

                <div className="form-item w-full">
                  <label className="text-xl ">Address</label>
                  <input
                    type="text"
                    name="location"
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your address here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>

                <div className="form-item w-full">
                  <label className="text-xl ">Github Username</label>
                  <input
                    type="text"
                    name="gitUsername"
                    value={gitUsername}
                    required
                    onChange={(e) => setGithubusername(e.target.value)}
                    placeholder="Enter Github Username  here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>
                <div className="form-item w-full">
                  <label className="text-xl ">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={website}
                    required
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter Github Username  here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>
                <div className="form-item w-full">
                  <label className="text-xl ">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={skills}
                    required
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter Comma Separated Values here (eg. HTML,CSS,JavaScript,PHP)"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold ">More About Me</h3>
                  <hr />
                </div>

                <div className="form-item w-full">
                  <label className="text-xl ">Biography</label>
                  <textarea
                    rows="2"
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter your bio here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mt-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">My Social Media</h3>
                  <hr />
                </div>

                <div className="form-item">
                  <label className="text-xl ">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Enter your Instagram Username here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>
                <div className="form-item">
                  <label className="text-xl ">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="Enter your Facebook Username here"
                    className="w-full appearance-none text-black  rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  />
                </div>
                <div className="form-item">
                  <label className="text-xl ">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="Enter your LinkedIn Username here"
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200  "
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Create Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
