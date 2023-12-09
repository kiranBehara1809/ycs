import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const ACCOUNT_POPOVER_LIST = [
  {
    name: "About",
    url: "about",
    tooltip: "",
    icon: <InfoIcon fontSize="medium" sx={{ color: "primary.main" }} />,
  },
  {
    name: "Settings",
    url: "settings",
    tooltip: "",
    icon: <SettingsIcon fontSize="medium" sx={{ color: "primary.main" }} />,
  },
  {
    name: "Logout",
    url: "/login",
    tooltip: "",
    icon: (
      <PowerSettingsNewIcon fontSize="medium" sx={{ color: "primary.main" }} />
    ),
  },
];

export { ACCOUNT_POPOVER_LIST  };