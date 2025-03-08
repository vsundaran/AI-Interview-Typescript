import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { theme } from "./theme/create-theme";

// Lazy-loaded components
const HomeLayout = lazy(() => import("./layouts/default"));
const Home = lazy(() => import("./HOME_UI/home"));
const OrganisationLayout = lazy(() => import("./layouts/organisations"));
const OrganisationDashboardLayout = lazy(
  () => import("./ORGANISATION_PORTAL/dashboard-layout")
);
const CreateJob = lazy(() => import("./ORGANISATION_PORTAL/create-job"));
const OrganisationDashboard = lazy(
  () => import("./ORGANISATION_PORTAL/dashboard")
);
const OrganisationProfile = lazy(() => import("./ORGANISATION_PORTAL/profile"));
const CandidateLayout = lazy(() => import("./layouts/candidate"));
const CandidateDashboard = lazy(() => import("./CANDIDATE_PORTAL/dashboard"));
const CandidateDashboardLayout = lazy(
  () => import("./CANDIDATE_PORTAL/candidate-dashboard-layout")
);
const CandidateCreateJob = lazy(() => import("./CANDIDATE_PORTAL/create-job"));
const CandidatesInterviews = lazy(
  () => import("./CANDIDATE_PORTAL/interviews")
);
const CandidateProfile = lazy(() => import("./CANDIDATE_PORTAL/profile"));
const OrganisationCandidatesList = lazy(
  () => import("./ORGANISATION_PORTAL/candidate-list")
);
const OrganizationSignin = lazy(() => import("./ORGANISATION_PORTAL/sign-in"));
const OrganizationSignup = lazy(() => import("./ORGANISATION_PORTAL/sign-up"));
const CandidateSignin = lazy(() => import("./CANDIDATE_PORTAL/sign-in"));
const CandidateSignup = lazy(() => import("./CANDIDATE_PORTAL/sign-up"));
const ForgotPassword = lazy(
  () => import("./components/elementes/forgot-passwrod")
);
const ProtectedRoute = lazy(
  () => import("./components/elementes/protected-route")
);
const AttendingAIInterview = lazy(
  () => import("./CANDIDATE_PORTAL/attending-interview")
);
const BodyLanguageAnalyzer = lazy(
  () => import("./components/elementes/body-language-analyzer")
);

function App() {
  open router key needed
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
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomeLayout />}>
                  <Route index element={<Home />} />
                  <Route path="*" element={<Navigate to={"/"} />} />
                </Route>

                <Route path="/candidate" element={<CandidateLayout />}>
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="bodyLanguageAnalyzer"
                    element={<BodyLanguageAnalyzer />}
                  />
                  <Route path="sign-in" element={<CandidateSignin />} />
                  <Route path="sign-up" element={<CandidateSignup />} />
                  <Route
                    path="attending-interview/:job_id"
                    element={
                      <ProtectedRoute>
                        <AttendingAIInterview />
                      </ProtectedRoute>
                    }
                  />
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

                {/* Organisations routes */}
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
            </Suspense>
          </Container>
        </AuthContext>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
