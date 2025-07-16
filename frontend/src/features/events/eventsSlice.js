import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../../BaseUrl"

const API_URL = `${BASE_URL}/api/v1/main/events/`;

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get(API_URL);
  return response.data.results;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    resetEventsStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetEventsStatus } = eventsSlice.actions;
export default eventsSlice.reducer;
