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
    footer: "Developed by Kiran Behara",
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
  } else {
    return str;
  }
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
        for (const attribute of attributes) {
          if (attribute === "createdAt") {
            continue;
          }
          const value = current[attribute];
          if (value && value.toLowerCase().includes(searchTerm.toLowerCase())) {
            list.push(current);
          }
        }
      }
    }
    return list;
  };

export {
  addBaseUrl,
  showBasicToast,
  showConfirmToast,
  convertCamelCaseToTitleText,
  convertColumnName,
  getTableColumnNames,
  filterCustomTable,
};
