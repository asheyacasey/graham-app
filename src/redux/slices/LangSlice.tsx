import { createSlice } from "@reduxjs/toolkit";

const LangSlice = createSlice({
  name: "language",
  initialState: "en",
  reducers: {
    setLanguage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLanguage } = LangSlice.actions;
export default LangSlice.reducer;
