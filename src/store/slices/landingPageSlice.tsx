import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LandingPageType } from "../types/LandingPageType";

const initialState: LandingPageType = {
  section: 0,
};

export const landingPageSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<number>) => {
      state.section = action.payload;
    },
  },
});

export const { setSection } = landingPageSlice.actions;

export default landingPageSlice.reducer;
