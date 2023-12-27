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
import CancelIcon from "@mui/icons-material/Cancel";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { FaUserDoctor } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { FaStethoscope } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaUserInjured } from "react-icons/fa";
import AlbumIcon from "@mui/icons-material/Album";
import { VscTypeHierarchySub } from "react-icons/vsc";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { GrLanguage } from "react-icons/gr";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { BiSolidCity } from "react-icons/bi";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import FlagIcon from "@mui/icons-material/Flag";



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
const CURRENCY_ICON = <HiMiniCurrencyRupee className="reactIconsColor" />;
const CITY_ICON = <BiSolidCity className="reactIconsColor" />;
const LANGUAGE_ICON = <GrLanguage className="reactIconsColor" />;
const MARITAL_STATUS_ICON = <BiMaleFemale className="reactIconsColor" />;
const STATE_ICON = (
  <HolidayVillageIcon fontSize="large" sx={{ color: "primary.main" }} />
);
const COUNTRY_ICON = <FlagIcon fontSize="large" sx={{ color: "primary.main" }} />;
const SALUTATION_ICON = <FaHandshake className="reactIconsColor" />;
const CLOSE_ICON = (
  <CancelIcon fontSize="medium" sx={{ color: "error.main" }} />
);
const NEXT_OF_KIN_ICON = (
  <FamilyRestroomIcon fontSize="large" sx={{ color: "primary.main" }} />
);

const DOCTOR_ICON = <FaUserDoctor className="reactIconsColor" />;
const RX_DASHBOARD_ICON = <RxDashboard className="reactIconsColor" />;
const DOC_SPECIALITY_ICON = <FaStethoscope className="reactIconsColor" />;
const DOC_DEPT_ICON = <FaBuildingUser className="reactIconsColor" />;
const DOC_DESIGNATION_ICON = <FaAddressCard className="reactIconsColor" />;
const DOC_ADD_ICON = <IoPersonAdd className="reactIconsColor" />;
const DOC_TYPES_ICON = <VscTypeHierarchySub className="reactIconsColor" />;

const APPOINTMENT_CALENDAR_ICON = (
  <EventAvailableIcon fontSize="large" sx={{ color: "primary.main" }} />
);

const OUT_PATIENT_ICON = (
  <>
    <AlbumIcon fontSize="large" sx={{ color: "primary.main" }} />
    {/* <FaUserInjured className="reactIconsTwoIcons outPatientIcon" /> */}
  </>
);
const IN_PATIENT_ICON = (
  <>
    <BsFillInfoCircleFill className="reactIconsTwoIcons" />
    {/* <FaUserInjured className="reactIconsTwoIcons" /> */}
  </>
);

export {
  SETTINGS_ICON,
  HOME_ICON,
  ADMIN_PANEL_ICON,
  BLOOD_GROUP_ICON,
  GENDER_ICON,
  MARITAL_STATUS_ICON,
  SALUTATION_ICON,
  CLOSE_ICON,
  NEXT_OF_KIN_ICON,
  DOCTOR_ICON,
  DOC_SPECIALITY_ICON,
  RX_DASHBOARD_ICON,
  DOC_DEPT_ICON,
  DOC_ADD_ICON,
  DOC_DESIGNATION_ICON,
  OUT_PATIENT_ICON,
  IN_PATIENT_ICON,
  DOC_TYPES_ICON,
  APPOINTMENT_CALENDAR_ICON,
  LANGUAGE_ICON,
  CURRENCY_ICON,
  CITY_ICON,
  STATE_ICON,
  COUNTRY_ICON,
};
