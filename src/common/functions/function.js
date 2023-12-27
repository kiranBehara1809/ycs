import Swal from "sweetalert2";
import { BASE_ROUTE_PATH } from "../../constants/project";
import { handleLogout } from "../../http/authRequests";

const addBaseUrl = (url) => {
  return `/${BASE_ROUTE_PATH}/${url}`;
};

const showBasicToast = (icon, text) => {
  if(text === "TVA"){
    showTokenExpiredAndLogout()
    return
  }
  Swal.fire({
    icon: icon,
    text: text,
    showConfirmButton: true,
    showConfirmButton: true,
    allowOutsideClick: false,
    footer: "Developed by Kiran Behara",
  });
};

const showTokenExpiredAndLogout = () => {
   Swal.fire({
    icon: "error",
    allowEscapeKey : false,
    text: "Token Expired, re-login to continue",
    showConfirmButton: true,
    allowOutsideClick : false,
    footer: "Developed by Kiran Behara",
  }).then(async (res) => {
    if(res.isConfirmed){
      await handleLogout();
      window.location.href = `${window.location.origin}/login`;
    }
  });
};

const showConfirmToast = (icon, text) => {
  return Swal.fire({
    icon: icon,
    text: text,
    showConfirmButton: true,
    showCancelButton: true,
    showConfirmButton: true,
    allowOutsideClick: false,
    footer: "Developed by Kiran Behara",
  });
};

const convertCamelCaseToTitleText = (camelCaseText) => {
  const text = camelCaseText;
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

const convertColumnName = (columnName, str) => {
  if (columnName === "createdAt") {
    const date = new Date(`${str}`);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() - 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  } 
  if(typeof str === "boolean"){
    if(str){
      return "✅"
    }else{
      return "❌";
    }
  }
    return str;
};

const getTableColumnNames = (data) => {
  let tempArr = [];
  if (data && data.length > 0) {
    Object.keys(data[0])?.forEach((col) => {
      if (col !== "_id" && col !== "__v")
        tempArr.push(col);
    });
  }
  return tempArr;
};

  const filterCustomTable = (attributes, rows, searchTerm) => {
    let list = [];
    if (rows?.length > 0) {
      if(searchTerm?.length === 0){
        list =  [...rows]
        return
      }
      for (const current of rows) {
        let value;
        for (const attribute of attributes) {
          if (attribute === "createdAt") {
            continue;
          }
           value = current[attribute];
           if( typeof value === "boolean" || typeof value === "object" || typeof value === "number" || typeof value === "undefined" || value?.length === 0){
            continue;
           }
          // const value = current[attribute];
          if (value && value.toLowerCase().includes(searchTerm.toLowerCase())) {
            list.push(current);
          }
        }
      }
    }
    return [...new Set(list)];
  };

export {
  addBaseUrl,
  showBasicToast,
  showConfirmToast,
  convertCamelCaseToTitleText,
  convertColumnName,
  getTableColumnNames,
  filterCustomTable,
  showTokenExpiredAndLogout,
};
