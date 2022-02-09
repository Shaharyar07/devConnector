import React from "react";
import "./Chat.css";
import { useEffect, useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { Authenticate } from "../../redux/authentications/authUser";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [username, setUsername] = useState("");

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          className="mx-3 m-3 rounded"
          placeholder=" Type handle"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="rounded mx-3 px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => createDirectChat(creds)}
        >
          Create
        </button>
      </div>
    );
  }
  useEffect(() => {
    Authenticate().then((res) => {
      setName(res.user.name);
      setSecret(res.secret);
      setLoading(false);
    });
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
      <ChatEngine
        offset={5}
        height="80vh"
        projectID="0d350f90-f96a-48eb-addc-dc5061739b6a"
        userName={name}
        userSecret={secret}
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
    </div>
  );
};

export default Chat;
