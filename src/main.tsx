import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import ClientWrapper from "./components/ClientWrapper.tsx";
import CyberElementsOverlay from "./components/CyberElementsOverlay.tsx";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import XDefiant from "./components/portfolioPages/xdefiant/XDefiant.tsx";
import Rocksmith from "./components/portfolioPages/rocksmith/Rocksmith.tsx";
import Indeed from "./components/portfolioPages/indeed/Indeed.tsx";
import OtherProjects from "./components/portfolioPages/projects/OtherProjects.tsx";
import { gsapLoader } from "./components/gsapLoader.tsx";

const Layout = () => {
  return (
    <div className="layout">
      <CyberElementsOverlay />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: gsapLoader,
      },
      {
        path: "/XDefiant",
        element: <XDefiant />,
        loader: gsapLoader,
      },
      {
        path: "/Rocksmith",
        element: <Rocksmith />,
        loader: gsapLoader,
      },
      {
        path: "/Indeed",
        element: <Indeed />,
        loader: gsapLoader,
      },
      {
        path: "/OtherProjects",
        element: <OtherProjects />,
        loader: gsapLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <ClientWrapper>
    <RouterProvider router={router} />
  </ClientWrapper>
);
