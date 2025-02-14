import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CandidateSideNavList from "../candidate-side-nav-list";

export default function CandidateDashboardLayout() {
  return (
    <Box display={"flex"} gap={2} width={"100%"}>
      <Box
        width={"100%"}
        maxWidth={200}
        sx={{ display: { md: "block", xs: "none" } }}
      >
        <CandidateSideNavList />
      </Box>
      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
        {/* Render child components dynamically */}
        <Outlet />
      </Box>
    </Box>
  );
}
