"use client";
import { Provider } from "react-redux";
import store from "../store/Store";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientWrapper;
