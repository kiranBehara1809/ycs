import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import FemaleIcon from "@mui/icons-material/Female";
import { Box } from "@mui/material";
import { BiMaleFemale } from "react-icons/bi";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";


const SETTINGS_ICON = (
  <SettingsIcon fontSize="large" sx={{ color: "primary.main" }} />
);
const HOME_ICON = <HomeIcon fontSize="large" sx={{ color: "primary.main" }} />;
const ADMIN_PANEL_ICON = (
  <AdminPanelSettingsIcon fontSize="large" sx={{ color: "primary.main" }} />
);

const BLOOD_GROUP_ICON = (
  <BloodtypeIcon fontSize="large" sx={{ color: "primary.main" }} />
);

const GENDER_ICON = <IoMdFemale className="reactIconsColor" />;
const MARITAL_STATUS_ICON = <BiMaleFemale className="reactIconsColor" />;
const SALUTATION_ICON = <FaHandshake className="reactIconsColor" />;

export {
  SETTINGS_ICON,
  HOME_ICON,
  ADMIN_PANEL_ICON,
  BLOOD_GROUP_ICON,
  GENDER_ICON,
  MARITAL_STATUS_ICON,
  SALUTATION_ICON,
};