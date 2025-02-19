import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import JobInfo from "../../components/elementes/job-info";
import AdditionalInfo from "../../components/elementes/additional-info";
import { APP_COLORS } from "../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../context/AuthContext";
import { createJob } from "../../services/API/routes/common";
import { enqueueSnackbar } from "notistack";
import { returnErrorMessage } from "../../components/elementes/error";
import { resetField } from "../../redux/slice/job-info";
import { setCandidateInterviews } from "../../redux/slice/candidate-interviews";

export default function CandidateCreateJob() {
  //states and funcs
  const [value, setValue] = useState("1");
  const { user } = useAuth();
  const DISPATCH = useDispatch();
  const {
    Technology,
    companyName,
    degree,
    education,
    experienced,
    interviewType,
    jobDescription,
    jobRole,
    lastProjectName,
    name,
    salaryLevel,
    skills,
    yearsOfExperience,
  } = useSelector((state: RootState) => state.job_info);
  const [loading, setLoading] = useState(false);

  //   const Navigate = useNavigate();

  //event handlers
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const parseStringToArray = (str: string) =>
    str.trim() ? str.trim().split(",") : [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    // Navigate("/interview", { state: { triggerEvent: true } });

    const API_PAYLOAD = {
      userId: user?._id || "",
      jobRole: jobRole || "",
      experienced: experienced || "",
      yearsOfExperience: yearsOfExperience || "",
      technology: parseStringToArray(Technology),
      skills: parseStringToArray(skills),
      targetCompanyName: parseStringToArray(companyName),
      salaryLevel: salaryLevel || "",
      degree: degree || "",
      education: education || "",
      name: name || "",
      lastProjectName: lastProjectName || "",
      interviewType: interviewType || "",
      jobDescriptionOrResume: jobDescription || "",
      role: user?.role || "",
      status: "Pending",
    };

    try {
      setLoading(true);
      const response = await createJob({ ...API_PAYLOAD });
      if (response.success) {
        enqueueSnackbar("Job Created successfully", { variant: "success" });
        DISPATCH(resetField());
        DISPATCH(
          setCandidateInterviews({
            candidateInterviews: response.filteredJobRoles,
          })
        );
      } else {
        throw new Error("Failed to create job");
      }
    } catch (err) {
      const errorMessage = returnErrorMessage(err);
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width={"100%"}>
      <Typography variant="h6" sx={{ color: APP_COLORS.PRIMARY }}>
        Welcome to the AI Interview Preparation Tool!
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        To ensure you get the most relevant and tailored interview questions,
        please provide accurate and detailed job information.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        Enter your own job profile details, including role, experience level,
        education, and key skills.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box boxShadow={1} padding={2} marginTop={2}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="Job Info" value="1" />
                  <Tab label="Additional Info" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <JobInfo />
              </TabPanel>
              <TabPanel value="2">
                <AdditionalInfo />
              </TabPanel>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ marginTop: 2 }}
                  type="submit"
                  variant="outlined"
                  loading={loading}
                >
                  Create Job
                </Button>
              </Box>
            </TabContext>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
