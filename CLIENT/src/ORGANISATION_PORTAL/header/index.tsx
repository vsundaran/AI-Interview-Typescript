// MUI Elements
import { Avatar, Box, Button, IconButton } from "@mui/material";
import AppLogo from "../../components/elementes/app-logo";
import { useNavigate } from "react-router-dom";
import DashboardSideNavList from "../dashboard-side-nav-list";

import * as React from "react";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";

import { List } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { APP_COLORS } from "../../theme/colors";
import { fetchUserData } from "../../services/API/routes/common";
import Cookies from "js-cookie";

export default function OrganisationHeader() {
  const Navigate = useNavigate();
  const { user, setAuthLoading, setUser } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserData = async () => {
    try {
      setAuthLoading(true);
      if (!Cookies.get("organisationToken")) {
        throw new Error("Unautherized user");
      }
      const response = await fetchUserData();

      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      //getting the user data
      getUserData();
    }

    console.log("user data useEffect", user);
    //eslint-disable-next-line
  }, []);

  return (
    <Box
      zIndex={100}
      top={0}
      minHeight={"60px"}
      paddingY={1}
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
      {user ? (
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
              onClick={() => Navigate("create-job")}
            >
              Create job
            </Button>
          </Box>
          {/* <Avatar
            alt="User"
            src="https://media.licdn.com/dms/image/v2/D4D08AQE5GxVsMBA2vw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1636398674059?e=2147483647&v=beta&t=HNXXMj4_BJOtgI1SjdwaLthc1N1CzTqAs_AkCKTkK7I"
          /> */}
          {user ? (
            <Avatar sx={{ background: APP_COLORS.PRIMARY }}>
              {user.name.split("")?.[0].toUpperCase() || "A"}
            </Avatar>
          ) : null}
        </Box>
      ) : null}

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Box paddingX={2}>
          <DashboardSideNavList />
        </Box>
      </Menu>
    </Box>
  );
}
