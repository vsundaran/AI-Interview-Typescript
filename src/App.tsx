// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { Container } from "@mui/material";
// import { lazy } from "react";

// import InitialHome from "./HOME_UI/home";
import HomeLayout from "./layouts/default";
import Home from "./HOME_UI/home";
import OrganisationLayout from "./layouts/organisations";
import OrganisationDashboard from "./ORGANISATION_PORTAL/dashboard";
import PageNotFound from "./components/elementes/page-not-found";
import CreateJob from "./ORGANISATION_PORTAL/create-job";

// Lazy Loading for components
// import HomeLayout from "./layouts/default";
// const Home = lazy(() => import("./components/views/home"));
// const Interview = lazy(() => import("./components/views/interview"));
// import Home from "./components/views/home";

//Loading for fallback
// import { Loading } from "./components/elementes/suspense-loading";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <AuthContext>
      <Container>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            {/* 404 UI */}
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/*organisations routes */}
          <Route path="/organisation" element={<OrganisationLayout />}>
            <Route index element={<OrganisationDashboard />} />
            <Route path="create-job" element={<CreateJob />} />
          </Route>
        </Routes>
      </Container>
    </AuthContext>
  );
}

export default App;
