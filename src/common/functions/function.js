import Swal from "sweetalert2";
import { BASE_ROUTE_PATH } from "../../constants/project";

const addBaseUrl = (url) => {
  return `/${BASE_ROUTE_PATH}/${url}`;
};

const showBasicToast = (icon, text) => {
  Swal.fire({
    icon: icon,
    text: text,
    showConfirmButton: true,
    footer : "Developed by Kiran Behara"
  });
};

const showConfirmToast = (icon, text) => {
  return Swal.fire({
    icon: icon,
    text: text,
    showConfirmButton: true,
    showCancelButton: true,
    footer: "Developed by Kiran Behara",
  });
};

export { addBaseUrl, showBasicToast, showConfirmToast };
