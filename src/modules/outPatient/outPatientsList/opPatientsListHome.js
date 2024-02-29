import React, { useState, useEffect } from "react";
import CustomHeaderWithSearchBar from "../../../common/components/customHeaderWithSearchBar";
import {
  ADD_USER_ICON,
  FILTER_ICON,
  USERS_ICON,
} from "../../../constants/icons";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  TableBody,
  TablePagination,
  Link,
  Typography,
} from "@mui/material";
import "../../../styles/opList.css";
import { useNavigate } from "react-router";
import {
  convertColumnName,
  filterCustomTable,
} from "../../../common/functions/function";
import { getAllPatients } from "../../../http/opRequests";
import OpPatientListTableView from "./opPatientListTableView";
import OpListGridView from "./opPatientListGridView";

const OutPatientsListHome = () => {
  const navigate = useNavigate();
  const [toggleListView, setToggleListView] = useState("table");
  const [opList, setOpList] = useState([]);
  const [dupOpList, setDupOpList] = useState([]);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const allPatients = await getAllPatients();
      const newPatients = allPatients?.reduce((acc, cur, i) => {
        const {
          firstName,
          middleName,
          lastName,
          ageString,
          gender,
          bloodGroup,
          maritalStatus,
          salutation,
        } = cur?.patientDetails;
        acc.push({
          firstName,
          middleName,
          lastName,
          ageString,
          gender: gender.label,
          bloodGroup: bloodGroup.label,
          salutation: salutation.label,
          maritalStatus: maritalStatus.label,
          ...cur?.commonDetails,
          ...cur,
        });
        return acc;
      }, []);
      setOpList(newPatients || []);
      setDupOpList(newPatients || []);
    } catch (e) {
      console.log("Error while Fetching all patients ---> ", e);
    }
  };

  const handleRegisterNewPatientClick = () => {
    navigate("/smc/outpatient/registration");
  };

  const handleSearchInput = (searchedInput) => {
    setOpList((prev) => {
      return searchedInput === "" || searchedInput === undefined
        ? dupOpList
        : filterCustomTable(
            [
              "firstName",
              "middleName",
              "lastName",
              "ageString",
              "gender",
              "bloodGroup",
              "salutation",
              "maritalStatus",
            ],
            dupOpList,
            searchedInput
          );
    });
  };

  return (
    <>
      <CustomHeaderWithSearchBar
        headerIcon={USERS_ICON}
        headerText={"Out Patients"}
        placeholder={`Search Out Patients`}
        seachBarWidth={"200px"}
        searchedInput={(event) => handleSearchInput(event)}
        btnHtml={
          <>
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={toggleListView}
              exclusive
              className="button"
              onChange={(e) => setToggleListView(e.target.value)}
              aria-label="Platform"
            >
              <ToggleButton value="table">Table</ToggleButton>
              <ToggleButton value="grid">Grid</ToggleButton>
            </ToggleButtonGroup>
            <Tooltip arrow title={`Filters`}>
              <Button
                onClick={handleRegisterNewPatientClick}
                variant="contained"
                size="small"
                className="button registerNewButton"
                startIcon={FILTER_ICON}
              >
                Filters
              </Button>
            </Tooltip>
            <Tooltip arrow title={`Register New Patient`}>
              <Button
                onClick={handleRegisterNewPatientClick}
                variant="contained"
                size="small"
                className="button registerNewButton"
                startIcon={ADD_USER_ICON}
              >
                Register New Patient
              </Button>
            </Tooltip>
          </>
        }
      />
      {toggleListView === "table" ? (
        <OpPatientListTableView data={opList} />
      ) : (
        <OpListGridView data={opList} />
      )}
    </>
  );
};
export default OutPatientsListHome;
