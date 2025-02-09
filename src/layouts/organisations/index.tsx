import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import OrganisationHeader from "../../ORGANISATION_PORTAL/header";

export default function OrganisationLayout() {
  return (
    <Box>
      <Stack spacing={2}>
        <OrganisationHeader />
        <Outlet />
      </Stack>
    </Box>
  );
}
