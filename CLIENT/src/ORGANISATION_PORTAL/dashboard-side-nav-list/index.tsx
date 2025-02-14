import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import {
  BriefcaseBusiness,
  CircleUser,
  LogOut,
  LayoutDashboard,
  PersonStanding,
} from "lucide-react";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardSideNavList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Navigate = useNavigate();
  const location = useLocation();
  const { openLogoutModal } = useAuth();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    navLink: string
  ) => {
    if (navLink !== "logout") {
      setSelectedIndex(index);
      Navigate(navLink);
    } else {
      openLogoutModal();
    }
  };

  useEffect(() => {
    const URL = location.pathname;
    switch (URL) {
      case "/organisation/dashboard":
        setSelectedIndex(0);
        break;
      case "/organisation":
        setSelectedIndex(0);
        break;
      case "/organisation/candidate-list":
        setSelectedIndex(1);
        break;
      case "/organisation/create-job":
        setSelectedIndex(2);
        break;
      case "/organisation/profile":
        setSelectedIndex(3);
        break;
      case "/organisation/logout":
        setSelectedIndex(4);
        break;
      default:
        setSelectedIndex(-1); // Fallback if URL doesn't match
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Box sx={{ width: "100%", maxWidth: 460, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, "dashboard")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <LayoutDashboard size={18} />
                  <Typography variant="body1">Dashboard</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, "candidate-list")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <PersonStanding size={18} />
                  <Typography variant="body1">Candidate List</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2, "create-job")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <BriefcaseBusiness size={18} />
                  <Typography variant="body1">Create Job</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3, "profile")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <CircleUser size={18} />
                  <Typography variant="body1">Profile</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4, "logout")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <LogOut size={18} color="#d32f2f" />
                  <Typography variant="body1" color="error">
                    Logout
                  </Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
