import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
};

export const registerUser = createAsyncThunk(
  "connect/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: userData,
      });
      const data = await res.json();
      if (res.status !== 201) {
        throw new Error(data);
      }
    } catch (err) {
      const message = err.toString() || err?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "connect/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data);
      }
      return data;
    } catch (err) {
      const message = err.toString() || err?.message || err.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => initialState,
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = null;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts } =
  authSlice.actions;

export default authSlice.reducer;
