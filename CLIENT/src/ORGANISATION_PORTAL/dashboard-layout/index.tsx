import { Box } from "@mui/material";
import DashboardSideNavList from "../dashboard-side-nav-list";
import { Outlet } from "react-router-dom";

export default function OrganisationDashboardLayout() {
  return (
    <Box display={"flex"} gap={2}>
      <Box
        width={"100%"}
        maxWidth={200}
        sx={{ display: { md: "block", xs: "none" } }}
      >
        <DashboardSideNavList />
      </Box>
      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
        {/* Render child components dynamically */}
        <Outlet />
      </Box>
    </Box>
  );
}
