import { Box, Stack } from "@mui/material";
import Header from "../../components/elementes/header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <Box>
      <Stack spacing={2}>
        <Header />
        <Outlet />
      </Stack>
    </Box>
  );
}
