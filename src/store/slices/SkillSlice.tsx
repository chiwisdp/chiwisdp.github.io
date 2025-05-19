import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkillType } from "../types/SkillType";

const initialState: SkillType = {
  skill: {},
};

export const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setSkill: (state, action: PayloadAction<{}>) => {
      state.skill = action.payload;
    },
  },
});

export const { setSkill } = skillSlice.actions;

export default skillSlice.reducer;
