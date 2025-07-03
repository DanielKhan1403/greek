// src/features/contentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
// ✅ Базовый URL


// ✅ Async Thunks
export const fetchPosts = createAsyncThunk("content/fetchPosts", async () => {
  const res = await fetch(`${BASE_URL}api/v1/mainposts/`);
  return await res.json();
});

export const fetchEvents = createAsyncThunk("content/fetchEvents", async () => {
  const res = await fetch(`${BASE_URL}api/v1/mainevents/`);
  return await res.json();
});

// ✅ Slice
const contentSlice = createSlice({
  name: "content",
  initialState: {
    loading: false,
    posts: [],
    events: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // POST
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // EVENTS
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer;
