import { configureStore } from "@reduxjs/toolkit";
import sectionReducer from "./slices/landingPageSlice";
import skillReducer from "./slices/SkillSlice";

const store = configureStore({
  reducer: {
    landingPageSection: sectionReducer,
    skill: skillReducer,
  },
});

export type AppStore = typeof store;
//export type RootState = ReturnType<AppStore["getState"]>;
export interface RootState {
  // other properties
  landingPageSection: {
    section: number;
  };
  skill: {
    skill: {
      name: string;
      logo: string;
      description: string;
      level: number;
      color: string;
    };
  };
}
export type AppDispatch = AppStore["dispatch"];
export default store;
