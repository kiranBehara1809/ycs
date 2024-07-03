import React from "react";
import { USERS_ICON } from "../../constants/icons";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import EnhancedTable from "../../common/components/customTable";
import { Grid } from "@mui/material";
import { USERS } from "../../db/dbUsers/users";

const COLUMNS = [
  {
    id: "empId",
    label: "Emp ID",
    minWidth: "90px",
    link: true,
  },
  {
    id: "name",
    label: "Full Name",
    minWidth: "220px",
  },
  {
    id: "designation",
    label: "Designation",
    minWidth: "220px",
  },
  {
    id: "email",
    label: "Email",
    minWidth: "220px",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: "120px",
  },
  {
    id: "joinedOn",
    label: "Joined On",
    minWidth: "120px",
  },
  {
    id: "bloodGroup",
    label: "Blood Group",
    minWidth: "120px",
  },
  {
    id: "contactNo",
    label: "Contact No",
    minWidth: "120px",
  },
  {
    id: "alternateNo",
    label: "Alternate No",
    minWidth: "120px",
  },
  {
    id: "emergency",
    label: "Emergency No",
    minWidth: "120px",
  },
  {
    id: "area",
    label: "Area",
    minWidth: "120px",
  },
];

const Users = () => {
  return (
    <>
      <CustomHeaderWithSearchBar
        hideSearchBar
        headerText={"Employees"}
        headerIcon={USERS_ICON}
      />
      <Grid container>
        <Grid item xs={12}>
          <EnhancedTable
            columns={COLUMNS}
            data={USERS}
            maxHeight={"auto"}
            rowsPerPage={15}
            tableNote={"We all are one family - PT Family"}
            handleLinkClick={(val, col, rec) => {
              if (val) console.log(val);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
