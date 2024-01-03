import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  convertCamelCaseToTitleText,
  convertColumnName,
} from "../../common/functions/function";
import { Button, Grid, useTheme } from "@mui/material";
import SearchResultsNotFound from "../../common/components/searchResultsNotFound";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const theme = useTheme();
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    tableColumns,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  let columns = [];
  tableColumns.forEach((x) => {
    if (x !== "__v" && x !== "_id")
      columns.push({
        label: convertCamelCaseToTitleText(x),
        id: x,
        disablePadding: false,
      });
  });

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <Tooltip title={headCell.label?.length > 25 ? headCell.label: ""}>
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
                onClick={createSortHandler(headCell.id)}
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
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, tableName, tableIcon, masterObject } = props;
  const handleAddBtnClick = () => {
    props.handleAddClick(masterObject);
  };

  return (
    <CustomHeaderWithSearchBar
      key={tableName}
      headerIcon={tableIcon}
      headerText={tableName}
      placeholder={`Search ${tableName}`}
      seachBarWidth={"150px"}
      searchedInput={(val) => props.sendSearchValTopParent(val)}
      btnHtml={
        <>
          {masterObject.hideAddBtn ? null : (
            <>
              <Tooltip arrow title={`Add ${tableName}`}>
                <Button
                  onClick={() => handleAddBtnClick()}
                  variant="contained"
                  size="small"
                  sx={{
                    pl: 2,
                    pr: 2,
                    ml: 0.5,
                    mr: 0.5,
                    textTransform: "capitalize",
                  }}
                  startIcon={<AddBoxIcon />}
                >
                  Add
                </Button>
              </Tooltip>
            </>
          )}
          {numSelected === 1 ? (
            <>
              <Tooltip arrow title={`View`}>
                <Button
                  onClick={() => props.handleViewClick(masterObject, "view")}
                  variant="contained"
                  size="small"
                  sx={{
                    pl: 2,
                    pr: 2,
                    ml: 0.5,
                    mr: 0.5,
                    textTransform: "capitalize",
                  }}
                  startIcon={<RemoveRedEyeIcon />}
                >
                  View
                </Button>
              </Tooltip>
              <Tooltip arrow title={`Edit`}>
                <Button
                  onClick={() => props.handleEditClick(masterObject, "edit")}
                  variant="contained"
                  size="small"
                  sx={{
                    pl: 2,
                    pr: 2,
                    ml: 0.5,
                    mr: 0.5,
                    textTransform: "capitalize",
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Tooltip>
              <Tooltip arrow title={`Delete`}>
                <Button
                  onClick={() =>
                    props.handleDeleteClick(masterObject, "delete")
                  }
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{
                    pl: 2,
                    pr: 2,
                    ml: 0.5,
                    mr: 0.5,
                    textTransform: "capitalize",
                  }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Tooltip>
            </>
          ) : null}
        </>
      }
    />
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rerenderTable, setRerenderTable] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setRerenderTable((prev) => !prev);
  }, [props.tableData]);

  useEffect(() => {
    setSelectedRows(
      selected.map((x) => props.tableData.find((y) => y._id === x))
    );
  }, [selected]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.tableData?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.tableData.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(props.tableData, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rerenderTable]
  );

  return (
    <Box
      sx={{
        width: "calc(100% - 8px) !important",
        maxWidth: "calc(100% - 8px) !important",
        overflowX: "auto",
      }}
      key={props.tableName}
    >
      <Paper
        sx={{
          mb: 1,
          width: "100% !important",
          maxWidth: "100% !important",
          overflowX: "auto",
          overflowY: "hidden",
          "boxShadow": "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          masterObject={props.masterObject}
          tableName={props.tableName}
          tableIcon={props.tableIcon}
          handleAddClick={(masterName) => props.handleAddClick(masterName)}
          handleEditClick={(masterName) =>
            props.handleEditClick(masterName, selectedRows)
          }
          handleViewClick={(masterName) =>
            props.handleViewClick(masterName, selectedRows)
          }
          handleDeleteClick={(masterName) =>
            props.handleDeleteClick(masterName, selectedRows)
          }
          sendSearchValTopParent={(val) => props.filterTable(val)}
        />
        {props.tableData?.length > 0 ? (
          <>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <caption>{selected.length} Selected</caption>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={props.tableData?.length}
                  tableColumns={props.tableColumns}
                />
                <TableBody>
                  {visibleRows?.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        {props.tableColumns?.map((x, i) => {
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
                              {convertColumnName(x, row[x])}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ marginTop: "-53px" }}
              rowsPerPageOptions={[10]}
              component="div"
              count={props.tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <SearchResultsNotFound />
        )}
      </Paper>
    </Box>
  );
}
