import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import {
  BriefcaseBusiness,
  CircleUser,
  LogOut,
  LayoutDashboard,
  // TvMinimal,
  BriefcaseMedical,
} from "lucide-react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CandidateSideNavList() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const Navigate = useNavigate();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    navLink: string
  ) => {
    setSelectedIndex(index);
    if (navLink !== "logout") {
      Navigate(navLink);
    } else {
      console.log("Logout");
    }
  };

  useEffect(() => {
    const URL = window.location.pathname;
    console.log(URL, "URL");
    switch (URL) {
      case "/candidate/dashboard":
        setSelectedIndex(0);
        break;
      case "/candidate":
        setSelectedIndex(0);
        break;
      case "/candidate/create-job":
        setSelectedIndex(1);
        break;
      case "/candidate/created-jobs":
        setSelectedIndex(3);
        break;
      case "/candidate/profile":
        setSelectedIndex(4);
        break;
      case "/candidate/logout":
        setSelectedIndex(5);
        break;
      default:
        setSelectedIndex(-1); // Fallback if URL doesn't match
    }
    // eslint-disable-next-line
  }, []);

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
          onClick={(event) => handleListItemClick(event, 1, "create-job")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <BriefcaseMedical size={18} />
                  <Typography variant="body1">Create Job</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
        {/* <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2, "create-job")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <TvMinimal size={18} />
                  <Typography variant="body1">Interview</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton> */}
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3, "created-jobs")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <BriefcaseBusiness size={18} />
                  <Typography variant="body1">Created Jobs</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: "6px" }}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4, "profile")}
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
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5, "logout")}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <LogOut size={18} />
                  <Typography variant="body1">Logout</Typography>
                </Box>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
