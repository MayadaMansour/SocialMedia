import axios from "axios";

class ApiServices {
  async signIn(loginData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + "/users/signin",
      loginData,
    );
    return data;
  }

  async signUp(signUpData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + "/users/signup",
      signUpData,
    );
    return data;
  }

  async getPosts() {
    const { data } = await axios.get(import.meta.env.VITE_BASE_URL + "/posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  }

  async getDetailsPost(postId) {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  }

  async getPostComments(postId) {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + `/posts/${postId}/comments`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  }

  async getLoggedUserData() {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/users/profile-data",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );

    return data;
  }

  async createPost(formData) {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + "/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  }

  async createComment(postId, formData) {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );

    return data;
  }
}

export const apiServices = new ApiServices();
