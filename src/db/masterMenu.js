import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import FemaleIcon from "@mui/icons-material/Female";
import { Box } from "@mui/material";
import { BiMaleFemale } from "react-icons/bi";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { BLOOD_GROUP_ICON, GENDER_ICON, MARITAL_STATUS_ICON, SALUTATION_ICON } from "../constants/icons";





const MASTER_MENU = [
  {
    name: "Blood Group",
    url: "home",
    apiEndPoint: "/masters/bloodGroups",
    openInNewTab: false,
    icon: BLOOD_GROUP_ICON,
  },
  {
    name: "Gender",
    url: "home",
    apiEndPoint: "/masters/gender",
    openInNewTab: false,
    icon: GENDER_ICON,
  },
  {
    name: "Marital Status",
    url: "home",
    apiEndPoint: "/masters/maritalStatus",
    openInNewTab: false,
    icon: MARITAL_STATUS_ICON,
  },
  {
    name: "Salutation",
    url: "home",
    apiEndPoint: "/masters/salutation",
    openInNewTab: false,
    icon: SALUTATION_ICON,
  },
];

export {MASTER_MENU}
