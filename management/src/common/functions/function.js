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
  });
}

export { addBaseUrl, showBasicToast };
