// import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { Container } from "@mui/material";
// import { lazy } from "react";

// import PageNotFound from "./components/elementes/page-not-found";

// import InitialHome from "./HOME_UI/home";
import HomeLayout from "./layouts/default";
import Home from "./HOME_UI/home";
import OrganisationLayout from "./layouts/organisations";
import OrganisationDashboardLayout from "./ORGANISATION_PORTAL/dashboard-layout";
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
import OrganizationSignin from "./ORGANISATION_PORTAL/sign-in";
import OrganizationSignup from "./ORGANISATION_PORTAL/sign-up";
import ProtectedRoute from "./components/elementes/protected-route";
import CandidateSignin from "./CANDIDATE_PORTAL/sign-in";
import CandidateSignup from "./CANDIDATE_PORTAL/sign-up";
import ForgotPassword from "./components/elementes/forgot-passwrod";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CssBaseline />
        <AuthContext>
          <Container>
            <Routes>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                {/* 404 UI */}
                <Route path="*" element={<Navigate to={"/"} />} />
              </Route>

              <Route path="/candidate" element={<CandidateLayout />}>
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="sign-in" element={<CandidateSignin />} />
                <Route path="sign-up" element={<CandidateSignup />} />
                <Route element={<CandidateDashboardLayout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <CandidateDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <CandidateDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="create-job"
                    element={
                      <ProtectedRoute>
                        <CandidateCreateJob />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="interviews"
                    element={
                      <ProtectedRoute>
                        <CandidatesInterviews />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <CandidateProfile />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Route>

              {/*organisations routes */}
              <Route path="/organisation" element={<OrganisationLayout />}>
                <Route path="sign-up" element={<OrganizationSignup />} />
                <Route path="sign-in" element={<OrganizationSignin />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route element={<OrganisationDashboardLayout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <OrganisationDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="dashboard"
                    element={
                      <ProtectedRoute>
                        <OrganisationDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="candidate-list"
                    element={
                      <ProtectedRoute>
                        <OrganisationCandidatesList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="create-job"
                    element={
                      <ProtectedRoute>
                        <CreateJob />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <OrganisationProfile />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </Container>
        </AuthContext>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
