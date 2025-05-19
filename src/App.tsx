import { TopNavBar } from "./components/navbar/TopNavBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/Store";
import { setSection } from "./store/slices/landingPageSlice";
import { Experience } from "./components/experience/Experience";
import { Suspense, useEffect, useState } from "react";
import { HTMLLandingRenderPage } from "./pages/HTMLLandingRenderPage";
import { LoadingPage } from "./components/LoadingPage";
import ClientWrapper from "./components/ClientWrapper.tsx";

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  function handleSectionChange(section: number) {
    dispatch(setSection(section));
  }
  useEffect(() => {
    handleSectionChange(0);
  }, [showLandingPage]);

  return (
    <div className="content">
      <Suspense fallback={null}>
        <Experience />

        <HTMLLandingRenderPage onSectionChange={handleSectionChange} />
        <TopNavBar onSectionChange={handleSectionChange} />
      </Suspense>

      {!showLandingPage ? (
        <LoadingPage onShowLandingPage={() => setShowLandingPage(true)} />
      ) : null}
    </div>
  );
}
