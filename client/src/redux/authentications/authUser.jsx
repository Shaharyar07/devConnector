import instance from "../../baseUrl";

//Register User
export const registerUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = user;
    const chatData = {
      username: name,
      secret: password,
      email: email,
    };
    instance.post("https://api.chatengine.io/users/", chatData, {
      headers: {
        "PRIVATE-KEY": "f9711c35-8ec3-45ad-b5ba-306bfd7b7263",
      },
    });
    instance
      .post("/api/users/register", user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Login
export const loginUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    instance
      .post("/api/users/login", user)
      .then((res) => {
        resolve(res.data);
        if (res.data.success) {
          localStorage.setItem("authtoken", res.data.authtoken);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Fetch user profile

export const fetchUser = async () => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .get("/api/profile", {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Delete user and profile
export const deleteUser = async () => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .delete("/api/profile", {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Fetch all user profile

export const fetchDevelopers = async () => {
  return new Promise(async (resolve, reject) => {
    instance
      .get("/api/profile/all")
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Fetch  user
export const Authenticate = async () => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post("api/users/authenticate", token, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Add User Profile
export const AddProfile = async (profile) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post("/api/profile", profile, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Fetch user profile by handle

export const developerProfile = async (handle) => {
  return new Promise(async (resolve, reject) => {
    instance
      .get(`/api/profile/handle/${handle}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Fetch user profile by id
export const developerProfileById = async (id) => {
  return new Promise(async (resolve, reject) => {
    instance
      .get(`/api/profile/user/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Add User Education
export const AddEducation = async (education) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post("/api/profile/education", education, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Add User Experience
export const AddExperience = async (experience) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post("/api/profile/experience", experience, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Delete User Experience
export const deleteExperience = async (exp_id) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .delete(
        "/api/profile/experience/:exp_id",
        {
          headers: {
            authtoken: token,
          },
        },
        {
          params: { exp_id: exp_id },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Delete User Education
export const deleteEducation = async (edu_id) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .delete(
        "/api/profile/education/:edu_id",
        {
          headers: {
            authtoken: token,
          },
        },
        { params: edu_id }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Add user post
export const addPost = async (post) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post("/api/posts", post, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Fetch all posts
export const fetchPosts = async () => {
  return new Promise(async (resolve, reject) => {
    instance
      .get("/api/posts")
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//fetch post by id
export const fetchPostById = async (id) => {
  return new Promise(async (resolve, reject) => {
    instance
      .get(`/api/posts/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Delete user post
export const deletePost = async (post_id) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .delete(`/api/posts/${post_id}`, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Like post
export const likePost = async (post_id) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post(
        `/api/posts/like/${post_id}`,
        {},
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Unlike post
export const unlikePost = async (post_id) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post(
        `/api/posts/unlike/${post_id}`,
        {},
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Comment on post
export const commentPost = async (post_id, commentData) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post(`/api/posts/comment/${post_id}`, commentData, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
//Delete comment
export const deleteComment = async (post_id, comment_id) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("authtoken");
    instance
      .post(`/api/posts/comment/${post_id}/${comment_id}`, post_id, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
