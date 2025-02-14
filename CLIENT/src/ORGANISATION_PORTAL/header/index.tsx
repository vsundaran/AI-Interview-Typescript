// MUI Elements
import { Avatar, Box, Button, IconButton } from "@mui/material";
import AppLogo from "../../components/elementes/app-logo";
import { useNavigate } from "react-router-dom";
import DashboardSideNavList from "../dashboard-side-nav-list";

import * as React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";

import { List } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function OrganisationHeader() {
  const Navigate = useNavigate();
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Avatar
            alt="User"
            src="https://media.licdn.com/dms/image/v2/D4D08AQE5GxVsMBA2vw/croft-frontend-shrinkToFit1024/croft-frontend-shrinkToFit1024/0/1636398674059?e=2147483647&v=beta&t=HNXXMj4_BJOtgI1SjdwaLthc1N1CzTqAs_AkCKTkK7I"
          />
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
