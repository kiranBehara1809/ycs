import { BLOOD_GROUP_ICON, GENDER_ICON, MARITAL_STATUS_ICON, SALUTATION_ICON } from "../constants/icons";





const MASTER_MENU = [
  {
    name: "Blood Group",
    url: null,
    isDialog : true,
    uniqueName : "BLOOD_GROUP",
    apiEndPoint: "/masters/bloodGroups",
    openInNewTab: false,
    icon: BLOOD_GROUP_ICON,
    hideAddBtn : true
  },
  {
    name: "Gender",
    url: null,
    isDialog : true,
    uniqueName : "GENDER",
    apiEndPoint: "/masters/gender",
    openInNewTab: false,
    icon: GENDER_ICON,
    hideAddBtn : false
  },
  {
    name: "Marital Status",
    url: null,
    isDialog : true,
    uniqueName : "MARITAL_STATUS",
    apiEndPoint: "/masters/maritalStatus",
    openInNewTab: false,
    icon: MARITAL_STATUS_ICON,
    hideAddBtn : false
  },
  {
    name: "Salutation",
    url: null,
    isDialog : true,
    uniqueName : "SALUTATION",
    apiEndPoint: "/masters/salutation",
    openInNewTab: false,
    icon: SALUTATION_ICON,
    hideAddBtn : false
  },
];

export {MASTER_MENU}
