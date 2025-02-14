// MUI Elements
import { Avatar, Box, Button } from "@mui/material";
import AppLogo from "../../components/elementes/app-logo";
import { useNavigate } from "react-router-dom";

export default function HomeUIHeader() {
  const Navigate = useNavigate();

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
          <Button
            variant="contained"
            size="small"
            onClick={() => Navigate("/organisation")}
          >
            Organisation
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => Navigate("/candidate")}
          >
            Candidate
          </Button>
        </Box>
        <Avatar
          alt="User"
          src="https://media.licdn.com/dms/image/v2/D4D08AQE5GxVsMBA2vw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1636398674059?e=2147483647&v=beta&t=HNXXMj4_BJOtgI1SjdwaLthc1N1CzTqAs_AkCKTkK7I"
        />
      </Box>
    </Box>
  );
}
