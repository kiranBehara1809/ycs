import {
  Typography,
  Box,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PROJECT_INFO } from "../constants/project";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ACCOUNT_POPOVER_LIST } from "../db/header/accountPopoverDb";
import { useNavigate } from "react-router";
import { faker } from "@faker-js/faker";
import {
  addBaseUrl,
  convertDate,
  showBasicToast,
  showConfirmToast,
} from "../common/functions/function";
import { http_get } from "../http/betaInsightsRequests";
import ProfileDialog from "../modules/loggedInUser/profile";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import { META_DATA_ACTIONS } from "../store/slices/metaData";

const Header = () => {
  const customIconStyles = {
    margin: "0px 5px",
    cursor: "pointer",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageHeader } = useSelector((state) => state.metaData);
  const [currentDate, setCurrentDate] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const curUserEmail = localStorage.getItem("CUR_USER_EMAIL") || "";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [randomAvatar, setRandomAvatar] = useState(faker.image.avatar());

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(convertDate(new Date(), "MMM D, YYYY h:mm:ss A"));
    }, 1000);
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
  const handleAccountPopverOption = (option) => {
    if (option.url === null) {
      setProfileDialogOpen(true);
      handleClose();
      return;
    }
    if (option.url === "/login") {
      showConfirmToast("warning", "Do you want to logout?").then(
        async (res) => {
          if (res.isConfirmed) {
            showBasicToast("success", "Logout successful");
            navigate(option.url);
          }
        }
      );
    } else {
      navigate(addBaseUrl(option.url));
      handleClose();
    }
  };

  const getCurrentLoggedUser = async () => {
    // const currentUser = await getCurrentUser();
    // setCurrentUserData(currentUser || null);
    // store.dispatch(CURRENT_USER_ACTIONS.setCurrentUser(currentUser || null));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" noWrap component="div" sx={{ pl: 2 }}>
          {pageHeader}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pr: 2,
              justifyContent: "flex-end",
              maxWidth: "250px",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {curUserEmail}
            </span>
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentDate}
            </span>
          </Box>
          {randomAvatar === null ? (
            <AccountCircleIcon
              fontSize="large"
              sx={customIconStyles}
              onClick={(event) => handleClick(event)}
            />
          ) : (
            <img
              src={randomAvatar}
              width={30}
              onClick={(event) => handleClick(event)}
              height={30}
              style={{ borderRadius: "50%", cursor: "pointer" }}
            />
          )}
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
        <List sx={{ width: "250px" }}>
          <ListItem
            disablePadding
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={randomAvatar}
              width={120}
              height={120}
              style={{ borderRadius: "50%" }}
            />
          </ListItem>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <Tooltip title={curUserEmail}>
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {curUserEmail}
              </span>
            </Tooltip>
          </ListItem>
          {ACCOUNT_POPOVER_LIST.map((x, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemButton onClick={() => handleAccountPopverOption(x)}>
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    {x.icon}
                  </ListItemIcon>
                  <ListItemText>{x.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Popover>
      {profileDialogOpen && (
        <ProfileDialog
          currentUserData={currentUserData}
          profileDialogOpen={profileDialogOpen}
          setProfileDialogOpen={true}
        />
      )}
    </>
  );
};

export default Header;
