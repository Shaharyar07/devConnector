import React from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Developers from "./components/Developers";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Update from "./components/Update";
import ProfileItem from "./components/ProfileItem";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Chat from "./components/chat/Chat";
function App() {
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {}, [isAuth]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/profile/:handle" element={<ProfileItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/create-profile" element={<Profile />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/add-education" element={<Education />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/add-experience" element={<Experience />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/update-profile" element={<Update />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/feed" element={<Posts />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/post/:post_id" element={<Post />} />
        )}
        {(localStorage.getItem("authtoken") || isAuth) && (
          <Route path="/chat" element={<Chat />} />
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
