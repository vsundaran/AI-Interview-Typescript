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
import OrganisationProfile from "./ORGANISATION_PORTAL/profile";
import CandidateLayout from "./layouts/candidate";
import CandidateDashboard from "./CANDIDATE_PORTAL/dashboard";
import CandidateDashboardLayout from "./CANDIDATE_PORTAL/candidate-dashboard-layout";
import CandidateCreateJob from "./CANDIDATE_PORTAL/create-job";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CandidatesInterviews from "./CANDIDATE_PORTAL/interviews";
import CandidateProfile from "./CANDIDATE_PORTAL/profile";
import { theme } from "./theme/create-theme";
import OrganisationCandidatesList from "./ORGANISATION_PORTAL/candidate-list";

function App() {
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
                <Route path="interviews" element={<CandidatesInterviews />} />
                <Route path="profile" element={<CandidateProfile />} />
              </Route>
            </Route>

            {/*organisations routes */}
            <Route path="/organisation" element={<OrganisationLayout />}>
              <Route element={<OrganisationDashboardLayout />}>
                <Route index element={<OrganisationDashboard />} />
                <Route path="dashboard" element={<OrganisationDashboard />} />
                <Route
                  path="candidate-list"
                  element={<OrganisationCandidatesList />}
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
