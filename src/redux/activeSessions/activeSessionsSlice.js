import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSessions: 0,
};

const activeSessionsSlice = createSlice({
  name: 'activeSessions',
  initialState,
  reducers: {},
});

export const { increment, decrement } = activeSessionsSlice.actions;

export default activeSessionsSlice.reducer;
