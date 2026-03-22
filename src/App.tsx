import { lazy, Suspense } from "react";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail";

const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={
              <MainContainer>
                <CharacterModel />
              </MainContainer>
            } />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </Router>
  );
};

export default App;
