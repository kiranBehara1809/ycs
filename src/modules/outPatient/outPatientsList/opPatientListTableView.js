import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
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
} from "@mui/material";
import "../../../styles/opList.css";
import { visuallyHidden } from "@mui/utils";
import PatientViewer from "../../shared/patientViewer";
import SearchResultsNotFound from "../../../common/components/searchResultsNotFound";

const columns = [
  {
    label: "Patient No",
    id: "patientNo",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "UHID",
    id: "UHID",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "First Name",
    id: "firstName",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "Middle Name",
    id: "middleName",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "Last Name",
    id: "lastName",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "Gender",
    id: "gender",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "Age",
    id: "ageString",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "Registered By",
    id: "registeredBy",
    numeric: false,
    disablePadding: false,
  },
  {
    label: "Registered On",
    id: "registeredOn",
    numeric: false,
    disablePadding: false,
  },
];

const OpPatientListTableView = (props) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState({
    type: "",
    data: null,
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleLinkClick = (type, patient) => {
    setSelectedPatient({
      type: `${type}`,
      data: patient,
    });
  };
  return (
    <>
      {selectedPatient.type === "patientNo" && (
        <PatientViewer
          selectedPatient={selectedPatient.data}
          closePatientViewer={() =>
            setSelectedPatient({
              type: "",
              data: null,
            })
          }
        />
      )}
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={"small"}>
          <TableHead>
            <TableRow>
              {columns.map((headCell) => (
                <Tooltip
                  key={headCell?.id}
                  title={headCell.label?.length > 25 ? headCell.label : ""}
                >
                  <TableCell
                    sx={{
                      minWidth: "150px !important",
                      width: "150px !important",
                      maxWidth: "150px !important",
                      whiteSpace: "nowrap !important",
                      overflow: "hidden !important",
                      textOverflow: "ellipsis !important",
                    }}
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                      sx={{ fontWeight: "bold" }}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.map((row, index) => {
              return (
                <TableRow
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      background: (theme) =>
                        alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                    },
                  }}
                >
                  {columns?.map((x, i) => {
                    return (
                      <TableCell
                        key={i}
                        sx={{
                          width: "150px !important",
                          minWidth: "150px !important",
                          whiteSpace: "nowrap !important",
                          overflow: "hidden !important",
                          textOverflow: "ellipsis !important",
                        }}
                      >
                        {x.id === "UHID" || x.id === "patientNo" ? (
                          <Link onClick={() => handleLinkClick(x.id, row)}>
                            {row[x.id]}
                          </Link>
                        ) : (
                          row[x.id]
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {props?.data?.length === 0 && <SearchResultsNotFound />}
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={props?.data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default OpPatientListTableView;
