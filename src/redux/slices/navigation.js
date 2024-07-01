import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    value: false,
  },
  reducers: {
    toggle: state => {
      state.value = !state.value;
    },
    setFalse: state => {
      state.value = false;
    },
  },
});

export const { toggle, setFalse } = toggleSlice.actions;
export default toggleSlice.reducer;