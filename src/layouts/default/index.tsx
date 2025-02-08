import { Box, Stack } from "@mui/material";
import HomeUIHeader from "../../HOME_UI/header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <Box>
      <Stack spacing={2}>
        <HomeUIHeader />
        <Outlet />
      </Stack>
    </Box>
  );
}
