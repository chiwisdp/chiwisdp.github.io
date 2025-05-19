import { createContext, useContext } from "react";

export type MainPageContextType = {
  page: number;
  setPage: (page: number) => void;
  hasMeltedIce: boolean;
  setHasMeltedIce: (hasMeltedIce: boolean) => void;
};

export const MainPageContext = createContext<MainPageContextType>({
  page: 0,
  setPage: () => {},
  hasMeltedIce: false,
  setHasMeltedIce: () => {},
});

export const useMainPageContext = () => useContext(MainPageContext);
