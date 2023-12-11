import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const SIDE_NAV_ITEMS = [
  {
    name: "Home",
    url: "home",
    openInNewTab: false,
    icon: <HomeIcon sx={{ color: "primary.main" }} />,
  },
  {
    name: "Register New Patient",
    url: "registerNewPatient",
    openInNewTab: false,
    icon: <PersonAddIcon sx={{ color: "primary.main" }} />,
  },
];

const SIDE_NAV_ITEMS_ADMIN = [
  {
    name: "Admin",
    url: "admin",
    openInNewTab: false,
    icon: <AdminPanelSettingsIcon sx={{ color: "primary.main" }} />,
  },
];

export  { SIDE_NAV_ITEMS }