import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../../BaseUrl"

const API_URL = '${BASE_URL}/api/v1/main/posts/';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data.results;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetPostsStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetPostsStatus } = postsSlice.actions;
export default postsSlice.reducer;
