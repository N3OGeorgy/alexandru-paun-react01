import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  authenticated: false,
  established: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
});

export default authSlice.reducer;
