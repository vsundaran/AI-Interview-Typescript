import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

import DifficultGraph from "../../components/elementes/difficulty-graph";
import AIFeedBack from "../../components/elementes/feedback";
import OverAllMarks from "../../components/elementes/overall-marks";
import PerformanceChart from "../../components/elementes/performance";
import EyeContactChart from "../../components/elementes/eye-contact";
import QuestionsAnswerMarks from "../../components/elementes/question-answer-marks";

const CandidateDashboard = () => {
  return (
    <Box width={"100%"}>
      <Grid container spacing={{ md: 2 }}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Stack spacing={3}>
            <Grid container spacing={{ xs: 2 }}>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <Box display={"flex"} flexDirection={"column"} gap={3}>
                  <DifficultGraph />
                  <DifficultGraph />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <QuestionsAnswerMarks />
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2 }}>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <DifficultGraph />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <PerformanceChart />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        {/* Right */}
        <Grid spacing={{ xs: 2 }} size={{ xs: 12, sm: 12 }}>
          <Grid container spacing={{ xs: 2 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <EyeContactChart />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Box>
                <OverAllMarks />
              </Box>
            </Grid>
          </Grid>

          <Box marginTop={2} marginBottom={3}>
            <AIFeedBack />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateDashboard;
