import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userStatus: "idle",
  userDetail: null,
  userDetailStatus: "idle",
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await fetch("https://busy-az-api-9c92d29fca5a.herokuapp.com/api/user/freelancers");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.freelancers;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
});

export const getDetailUser = createAsyncThunk("users/getDetailUser", async (_id) => {
  try {
    const response = await fetch(`https://busy-az-api-9c92d29fca5a.herokuapp.com/api/user/freelancer/${_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    const data = await response.json();
    return data.freelancer;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (_id) => {
  try {
    const response = await fetch(`https://6676bd0c145714a1bd72a309.mockapi.io/users/${_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return _id;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.userStatus = "fail";
    });

    builder.addCase(getDetailUser.pending, (state) => {
      state.userDetailStatus = "loading";
    });
    builder.addCase(getDetailUser.fulfilled, (state, action) => {
      state.userDetailStatus = "success";
      state.userDetail = action.payload;
    });
    builder.addCase(getDetailUser.rejected, (state) => {
      state.userDetailStatus = "fail";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.userStatus = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.userStatus = "success";
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.userStatus = "fail";
    });
  },
});

export default userSlice.reducer;
