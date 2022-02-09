import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/authentications/authUser";
import {
  loginPending,
  loginSuccess,
  loginFail,
  loggedOut,
} from "../redux/authentications/authSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const { error, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
      cpassword: cpassword,
    };
    dispatch(loginPending());
    try {
      const Auth = await registerUser(user);

      if (Auth.status === "error") {
        return dispatch(loginFail(Auth.message));
      }
      dispatch(loginSuccess());
      setTimeout(() => {
        console.log("Logging in setTimeout");
        navigate("/login");
      }, 1000);
    } catch (error) {
      dispatch(
        loginFail("You already have an account. Please log into you account")
      );
    }
  };
  React.useEffect(() => {
    localStorage.removeItem("authtoken");
    dispatch(loggedOut());
  }, []);
  return (
    <div>
      <body className="login bg-gray-400">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="login w-full xl:w-3/4 lg:w-11/12 flex">
              <div className=" w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                {error && (
                  <div
                    class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                    role="alert"
                  >
                    <p>{error}</p>
                  </div>
                )}
                {isAuth && (
                  <div
                    class="bg-green-200 border-green-600 text-green-600 border-l-4 p-4"
                    role="alert"
                  >
                    <p>
                      Sign up was successful redirecting to login now now!!!
                    </p>
                  </div>
                )}
                <form
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className={classnames(
                          "w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
                          {
                            "border-red-500":
                              name.length > 0 && name.length < 3,
                          }
                        )}
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={name}
                        minLength={4}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      {name.length > 0 && name.length < 4 && (
                        <div className="mb-3 m-1 text-sm text-red-500">
                          {" "}
                          Too short
                        </div>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={classnames(
                        "w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
                        {
                          "border-red-500":
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              email.value
                            ),
                        }
                      )}
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {password.length > 0 && password.length < 4 && (
                        <div className="mb-2 m-1 text-sm text-red-500">
                          Minimum 4 Letters
                        </div>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="c_password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className={classnames(
                          "w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline",
                          {
                            "border-red-500": cpassword !== password,
                          }
                        )}
                        id="cpassword"
                        type="password"
                        placeholder="******************"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Register Account
                    </button>
                  </div>

                  <div className="text-center">
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/login"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default SignUp;
