import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  deletePost,
  likePost,
  unlikePost,
} from "../redux/authentications/authUser";

import {
  addPost,
  Authenticate,
  fetchPosts,
} from "../redux/authentications/authUser";
import "../App.css";
const Posts = () => {
  const divRef = useRef();
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
      user: user._id,
    };
    addPost(newPost);
    setText("");
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleDelete = async (id) => {
    deletePost(id);
  };
  const handleLike = (id) => {
    likePost(id);
  };
  const handleDislike = (id) => {
    unlikePost(id).then((data) => {});
  };

  const fetchData = async () => {
    const posts = await fetchPosts();
    setPosts(posts);

    const user = await Authenticate();
    setUser(user.user);
  };
  const findUserLike = (likes) => {
    if (likes.find((like) => like.user === user._id)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [posts]);
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
      {show && (
        <div
          className="container ml-5 bg-blue-500 flex items-center text-white text-sm font-bold px-4 py-3 relative"
          role="alert"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1216 1344v128q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64v-384h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zm-128-1152v192q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-192q0-26 19-45t45-19h256q26 0 45 19t19 45z"></path>
          </svg>
          <p>You need to have a Profile first to post comments.</p>
          <button
            onClick={() => setShow(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="h-6 w-6 text-white"
              viewBox="0 0 1792 1792"
            >
              <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
            </svg>
          </button>
        </div>
      )}
      <div className="post-form w-full ">
        <div className="text-center ">
          <h1 className="heading  text-center font-bold text-2xl pt-10 text-gray-800">
            Create your post now
          </h1>

          <div className="flex mt-2 justify-center">
            <div className="w-40 h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500 inline-flex"></div>
          </div>
        </div>

        <div className="editor  mx-auto w-full flex flex-col text-gray-800  border-gray-300 pt-4  max-w-2xl">
          <textarea
            className="description mx-3  sec p-3 h-20 border rounded border-gray-300 outline-none"
            placeholder="Describe your post here"
            required
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            minLength={6}
          ></textarea>

          <div className="icons flex text-gray-500 m-2">
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/200
            </div>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="post-button rounded-lg py-2 px-6  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Post
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              divRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden sm:block ca3-scroll-down-link ca3-scroll-down-arrow"
            data-ca3_iconfont="ETmodules"
            data-ca3_icon=""
          >
            {" "}
          </button>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="0.8"
            d="M0,64L48,85.3C96,107,192,149,288,181.3C384,213,480,235,576,213.3C672,192,768,128,864,112C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div ref={divRef} className="text-center">
          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
            NewsFeed
          </div>

          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500 inline-flex"></div>
          </div>
        </div>

        <div className="posts   flex justify-center flex-col text-gray-800  border-gray-300 p-4 shadow-lg">
          {posts.map((post) => {
            return (
              <div
                key={post._id}
                className="flex bg-white border-2 shadow-lg  rounded-lg px-10 lg:mx-8  my-4  "
              >
                <div className="flex items-start px-4 py-6">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                    src={post.avatar}
                    alt="avatar"
                  />
                  <div className="">
                    <div className="r">
                      <h2 className="text-lg font-semibold text-green-400 -mt-1">
                        {post.name}
                      </h2>
                    </div>
                    <small className="text-sm font-semibold text-blue-500">
                      {post.date.split("T")[0]}
                    </small>
                    <p className=" my-6 text-gray-700 break-normal text-lg">
                      {post.text}
                    </p>
                    <div className="mt-4 flex flex-wrap sm:flex-row items-center">
                      {findUserLike(post.likes) ? (
                        <button
                          className="flex p-2 mr-2 text-gray-700 text-sm "
                          onClick={() => handleLike(post._id)}
                        >
                          <img
                            alt=""
                            src="https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-like-touch-gestures-those-icons-fill-those-icons.png"
                          />
                          <span>{post.likes.length}</span>
                        </button>
                      ) : (
                        <button
                          className="flex p-2 mr-2  text-gray-700 text-sm "
                          onClick={() => handleLike(post._id)}
                        >
                          <img
                            alt=""
                            src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-touch-gestures-those-icons-lineal-those-icons.png"
                          />
                          <span>{post.likes.length}</span>
                        </button>
                      )}

                      <button
                        className="flex px-2 mr-2 text-gray-700 text-sm "
                        onClick={() => handleDislike(post._id)}
                      >
                        <img
                          alt=""
                          src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-touch-gestures-those-icons-lineal-those-icons.png"
                        />
                      </button>
                      <Link
                        to={`/post/${post._id}`}
                        className="flex mr-2 text-gray-700  "
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-6 h-6 mr-1 "
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                        <span>{post.comments.length}</span>
                      </Link>
                      {post.user === user._id && (
                        <button
                          className="flex flex-row  my-5 text-red-600"
                          onClick={() => handleDelete(post._id)}
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
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
