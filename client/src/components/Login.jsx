import React, { useState } from "react";
import "../App.css";
import { loginUser } from "../redux/authentications/authUser";
import { getUserSuccess } from "../redux/user/userSlice";
import { getUserProfile } from "../redux/user/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginPending,
  loginSuccess,
  loginFail,
  loggedOut,
} from "../redux/authentications/authSlice";
const Login = () => {
  const { error, isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    dispatch(loginPending());
    try {
      const Auth = await loginUser(credentials);

      if (Auth.status === "error") {
        return dispatch(loginFail(Auth.message));
      }

      dispatch(loginSuccess());
      dispatch(getUserProfile());
      dispatch(getUserSuccess());

      setTimeout(() => {
        console.log("Logging in setTimeout");
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      dispatch(loginFail("Invalid Credentials"));
    }
  };
  React.useEffect(() => {
    localStorage.removeItem("authtoken");

    dispatch(loggedOut());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="login">
      <div className="flex flex-col w-full max-w-md px-4 mt-4 py-10 bg-white rounded-lg shadow dark:bg-slate-100 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-bold  sm:text-2xl">
          Login To Your Account
        </div>
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
            <p>Login was successful redirecting to dashboard now!!!</p>
          </div>
        )}

        <div className="mt-8">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  id="email"
                  className="rounded-r-lg flex-1 appearance-none border  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <p href="#" className="inline-flex text-xs font-thin ">
                  Forgot Your Password?
                </p>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="py-2 px-4  bg-sky-500 hover:bg-cyan-700  focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6 pt-10"></div>
      </div>
    </section>
  );
};

export default Login;
