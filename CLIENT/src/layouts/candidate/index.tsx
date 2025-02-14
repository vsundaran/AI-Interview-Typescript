import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import CandidatesHeader from "../../CANDIDATE_PORTAL/header";

export default function CandidateLayout() {
  return (
    <Box>
      <Stack spacing={2}>
        <CandidatesHeader />
        <Outlet />
      </Stack>
    </Box>
  );
}
