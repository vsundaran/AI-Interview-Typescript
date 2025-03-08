// MUI Elements
import { Avatar, Box, Fade, IconButton, Menu } from "@mui/material";
import AppLogo from "../../components/elementes/app-logo";
import { useState, useEffect } from "react";
import { List } from "lucide-react";
import CandidateSideNavList from "../candidate-side-nav-list";
import { useAuth } from "../../context/AuthContext";
import { APP_COLORS } from "../../theme/colors";
import { fetchUserData } from "../../services/API/routes/common";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

export default function CandidatesHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { user, setAuthLoading, setUser } = useAuth();

  const getUserData = async () => {
    try {
      setAuthLoading(true);
      if (!Cookies.get("candidateToken")) {
        throw new Error("Unautherized user");
      }
      const response = await fetchUserData();
      if (!response.success && !response.user) {
        throw new Error("Unautherized user");
      }
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log((error as Error).message);
      enqueueSnackbar((error as Error).message, { variant: "error" });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!user) {
      //getting the user data
      getUserData();
    }

    //eslint-disable-next-line
  }, []);

  return (
    <Box
      zIndex={100}
      top={0}
      paddingY={1}
      minHeight={"60px"}
      position={"sticky"}
      width={"100%"}
      bgcolor={"#ffffffed"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"end"}
      borderBottom={"1px solid #eaeaea"}
    >
      <Box display={"flex"} alignItems={"center"} gap={1}>
        {user ? (
          <IconButton
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ display: { md: "none", xs: "flex" } }}
          >
            <List />
          </IconButton>
        ) : null}

        <AppLogo sx={{ width: "auto" }} />
      </Box>
      <Box>
        {user ? (
          // <Avatar
          //   alt="User"
          //   src="https://media.licdn.com/dms/image/v2/D4D08AQE5GxVsMBA2vw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1636398674059?e=2147483647&v=beta&t=HNXXMj4_BJOtgI1SjdwaLthc1N1CzTqAs_AkCKTkK7I"
          // />
          <Avatar sx={{ background: APP_COLORS.PRIMARY }}>
            {user.name.split("")?.[0].toUpperCase() || "A"}
          </Avatar>
        ) : null}
      </Box>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Box paddingX={2}>
          <CandidateSideNavList onClickCallBack={handleClose} />
        </Box>
      </Menu>
    </Box>
  );
}
