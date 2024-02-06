import {
  Typography,
  Box,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PROJECT_INFO } from "../constants/project";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ACCOUNT_POPOVER_LIST } from "../db/header/accountPopoverDb";
import { useNavigate } from "react-router";
import { addBaseUrl, showBasicToast, showConfirmToast } from "../common/functions/function";
import { handleLogout } from "../http/authRequests";
import { getCurrentUser } from "../http/userRequests";
import ProfileDialog from "../modules/loggedInUser/profile";
import store from "../store";
import { CURRENT_USER_ACTIONS } from "../store/slices/currentUser";

const Header = () => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [ currentUserData, setCurrentUserData] = useState(null)
  const navigate = useNavigate();
  const customIconStyles = {
    margin: "0px 5px",
    cursor: "pointer",
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    getCurrentLoggedUser();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleProfileDialogClose = (value) => {
    setProfileDialogOpen(false);
  };
  const handleAccountPopverOption =  (option) => {
    if(option.url === null){
      setProfileDialogOpen(true)
      handleClose();
      return;
    }
    if (option.url === "/login") {
      showConfirmToast("warning", "Do you want to logout?").then(async (res) => {
        if (res.isConfirmed) {
          await handleLogout()
            .then((res) => {
              if (res) {
                showBasicToast("success", res.msg);
                navigate(option.url);
              }
            })
            .catch((e) => {
              showBasicToast("error", "Error While Logging Out");
            });
        } else {
          handleClose();
        }
      });
    } else {
      navigate(addBaseUrl(option.url));
    }
  };

   const getCurrentLoggedUser = async () => {
     const currentUser = await getCurrentUser();
     setCurrentUserData(currentUser || null);
     store.dispatch(CURRENT_USER_ACTIONS.setCurrentUser(currentUser || null))
   };

  return (
    <>
      <ProfileDialog
        currentUserData={currentUserData}
        profileDialogOpen={profileDialogOpen}
        setProfileDialogOpen={handleProfileDialogClose}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Typography variant="h5" noWrap component="div">
          {PROJECT_INFO.name}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <NotificationsIcon fontSize="large" sx={customIconStyles} />
          <AccountCircleIcon
            fontSize="large"
            sx={customIconStyles}
            onClick={(event) => handleClick(event)}
          />
        </Box>
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {ACCOUNT_POPOVER_LIST.map((x, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemButton onClick={() => handleAccountPopverOption(x)}>
                  <ListItemIcon disablePadding sx={{ minWidth: "30px" }}>
                    {x.icon}
                  </ListItemIcon>
                  <ListItemText disablePadding>{x.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default Header;
