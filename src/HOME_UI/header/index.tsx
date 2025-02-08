// MUI Elements
import { Avatar, Box, Button } from "@mui/material";
import AppLogo from "../../components/elementes/app-logo";

export default function HomeUIHeader() {
  return (
    <Box
      zIndex={100}
      top={0}
      paddingY={1}
      position={"sticky"}
      width={"100%"}
      bgcolor={"#ffffffed"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"end"}
      borderBottom={"1px solid #eaeaea"}
    >
      <AppLogo sx={{ width: "auto" }} />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Button variant="contained">Organisation</Button>
          <Button variant="outlined">Candidate</Button>
        </Box>
        <Avatar
          alt="User"
          src="https://media.licdn.com/dms/image/v2/D4D08AQE5GxVsMBA2vw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1636398674059?e=2147483647&v=beta&t=HNXXMj4_BJOtgI1SjdwaLthc1N1CzTqAs_AkCKTkK7I"
        />
      </Box>
    </Box>
  );
}
