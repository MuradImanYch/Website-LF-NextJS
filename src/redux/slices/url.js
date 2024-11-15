import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const stringSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    setString: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setString } = stringSlice.actions;
export default stringSlice.reducer;