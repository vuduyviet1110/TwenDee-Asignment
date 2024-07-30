import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  picture: any;
  login: {
    username: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 10,
};

export const fetchUsers = createAsyncThunk<User[], number>(
  "users/fetchUsers",
  async (page) => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=10`
    );
    return response.data.results;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sortUsers: (state, action: PayloadAction<"username" | "fullName">) => {
      if (action.payload === "username") {
        state.users.sort((a, b) =>
          a.login.username.localeCompare(b.login.username)
        );
      } else if (action.payload === "fullName") {
        state.users.sort((a, b) => {
          const fullNameA = `${a.name.title} ${a.name.first} ${a.name.last}`;
          const fullNameB = `${b.name.title} ${b.name.first} ${b.name.last}`;
          return fullNameA.localeCompare(fullNameB);
        });
      }
    },
    setupdatePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { sortUsers, setupdatePage } = usersSlice.actions;
export default usersSlice.reducer;
