import { createSlice } from '@reduxjs/toolkit';

interface ActiveSessionsState {
  activeSessions: number;
}

const initialState: ActiveSessionsState = {
  activeSessions: 0,
};

const activeSessionsSlice = createSlice({
  name: 'activeSessions',
  initialState,
  reducers: {},
});

export default activeSessionsSlice.reducer;
