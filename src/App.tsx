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
import OrganisationDashboardLayout from "./ORGANISATION_PORTAL/dashboard-layout";
import PageNotFound from "./components/elementes/page-not-found";
import CreateJob from "./ORGANISATION_PORTAL/create-job";
import OrganisationDashboard from "./ORGANISATION_PORTAL/dashboard";
import OrganisationCandidateList from "./ORGANISATION_PORTAL/candidate-list";
import OrganisationProfile from "./ORGANISATION_PORTAL/profile";
import CandidateLayout from "./layouts/candidate";
import CandidateDashboard from "./CANDIDATE_PORTAL/dashboard";
import CandidateDashboardLayout from "./CANDIDATE_PORTAL/candidate-dashboard-layout";
import CandidateCreateJob from "./CANDIDATE_PORTAL/create-job";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import JobsDataGrid from "./components/elementes/created-jobs";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#174feb",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext>
        <Container>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              {/* 404 UI */}
              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path="/candidate" element={<CandidateLayout />}>
              <Route element={<CandidateDashboardLayout />}>
                <Route index element={<CandidateDashboard />} />
                <Route path="dashboard" element={<CandidateDashboard />} />
                <Route path="create-job" element={<CandidateCreateJob />} />
                <Route path="created-jobs" element={<JobsDataGrid />} />
              </Route>
            </Route>

            {/*organisations routes */}
            <Route path="/organisation" element={<OrganisationLayout />}>
              <Route element={<OrganisationDashboardLayout />}>
                <Route index element={<OrganisationDashboard />} />
                <Route path="dashboard" element={<OrganisationDashboard />} />
                <Route
                  path="candidate-list"
                  element={<OrganisationCandidateList />}
                />
                <Route path="create-job" element={<CreateJob />} />
                <Route path="profile" element={<OrganisationProfile />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </AuthContext>
    </ThemeProvider>
  );
}

export default App;
