import * as React from "react";
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

export default function CandidateCreateJob() {
  //states and funcs
  const [value, setValue] = React.useState("1");

  //   const Navigate = useNavigate();

  //event handlers
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    // Navigate("/interview", { state: { triggerEvent: true } });
  };

  return (
    <Box>
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
                <Button sx={{ marginTop: 2 }} type="submit" variant="outlined">
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
