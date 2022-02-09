import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import {
  developerProfileById,
  fetchPostById,
  commentPost,
  deleteComment,
} from "../redux/authentications/authUser";

const Post = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      text: comment,
      name: user.user.name,
      avatar: user.user.avatar,
      user: user.user._id,
    };
    commentPost(post_id, newComment);
    setComment("");
  };
  const handleDelete = async (id) => {
    deleteComment(post_id, id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const post = await fetchPostById(post_id);
      setPost(post);
      const user = await developerProfileById(localStorage.getItem("user"));
      setUser(user);
      setLoading(false);
    };
    fetchData();
  }, [post]);

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
      <div className=" bg-gray-100 flex items-center justify-center">
        <div className="px-10 lg:w-10/12 ">
          <div className="bg-white my-10 rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
            <img
              alt=""
              src={post.avatar}
              className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white"
            />

            <div className="mt-2">
              <h1 className="text-lg text-blue-500 font-semibold hover:underline cursor-pointer">
                {post.name}
              </h1>

              <p className="mt-4 rounded-2xl py-10 px-2 ml-0 bg-slate-200 font-bold text-gray-800">
                {post.text}
              </p>

              <div>
                <div>
                  <div className=" py-5  rounded">
                    <div className="">
                      <div className="mt-4 border  w-full border-1 rounded-2xl p-2 relative ">
                        <input
                          type="text"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className=" w-full text-sm font-medium tracking-wide"
                          placeholder="Type your comment here..."
                        />
                      </div>
                    </div>
                    <div className="modal__footer">
                      <div className="lg:text-right ">
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="post-button rounded-lg py-2 px-3  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {post.comments.map((comment) => {
                return (
                  <div key={comment._id} className="border rounded-2xl">
                    <div className=" px-4 mt-4 flex items-center ">
                      <div className="">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={comment.avatar}
                          alt=""
                        />
                      </div>

                      <div className="text-sm text-green-500 font-semibold">
                        {comment.name}
                      </div>
                      {post.user === user.user._id && (
                        <button
                          className="flex flex-row  sm:mx-2 lg:mx-10 my-5 text-red-600"
                          onClick={() => handleDelete(comment._id)}
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
                          Delete
                        </button>
                      )}
                    </div>
                    <h4 className="ml-8 my-4   text-blue-500  p-3 font-bold">
                      {comment.text}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
