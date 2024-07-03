import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { TABLE_HEAD_INFO_ICON } from "../../constants/icons";
// import Pagination from "./customPagination";
import { GoDotFill } from "react-icons/go";

const DEFAULT_TABLE_LIMIT = 10;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    bacgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const CustomTable = (props) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [defaultTableLimit, setDefaultTableLimit] = useState(
    props?.rowsPerPage || DEFAULT_TABLE_LIMIT
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingObj, setSortingObj] = useState(null);

  useEffect(() => {
    setCurrentPage(props.currentPage ?? 1);
  }, [props.currentPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setPage(0);
  };

  // const handleLinkClick = (colId, value, record) => {
  //   props.clickedColumn(colId, value, record);
  // };

  const formatValue = (value, column, record) => {
    if (column.hasOwnProperty("link") && column.link === true) {
      return (
        <span
          style={{
            color: "var(--reacIconsColor)",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => props.handleLinkClick(value, column, record)}
        >
          {value}
        </span>
      );
    }
    return value;
  };

  const handlePagintionChange = (page) => {
    setCurrentPage(page);
    // flushSortingAndPaginationPayload(page, sortingObj);
  };

  const handleSorting = (columnId, sortOrder) => {
    setSortingObj((prev) => {
      return {
        key: columnId,
        value: sortOrder,
      };
    });
    flushSortingAndPaginationPayload(currentPage, {
      key: columnId,
      value: sortOrder,
    });
  };

  const flushSortingAndPaginationPayload = (page, sortObj) => {
    props?.flushObj({
      paginationObj: { page: page, limit: defaultTableLimit } || null,
      sortingObj: sortObj ? sortObj : null,
    });
  };
  const visibleRows = useMemo(
    () =>
      props?.data.slice(
        page * defaultTableLimit,
        page * defaultTableLimit + defaultTableLimit
      ),
    [page, defaultTableLimit]
  );

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          sx={{ maxHeight: props.maxHeight ?? 270, overflowX: "auto" }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              {props.columnGroups?.length > 0 &&
                props.columnGroups?.map((x, i) => {
                  return (
                    <StyledTableCell
                      align="center"
                      colSpan={x.colSpan}
                      key={i}
                      sx={{
                        ...x.sx,
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main} !important`,
                        background: alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                      }}
                    >
                      {x.id}
                    </StyledTableCell>
                  );
                })}
              <TableRow>
                {props?.columns?.map((column) => (
                  <Tooltip
                    arrow
                    title={
                      column.hasOwnProperty("tooltip") &&
                      column.tooltip !== "" ? (
                        <Typography variant="body2">
                          {column.tooltip}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                    key={column.id}
                  >
                    <StyledTableCell
                      sx={{
                        ...column.sx,
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        color: `${theme.palette.primary.main} !important`,
                        background: alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                      }}
                    >
                      {column.label}
                      {column.hasOwnProperty("tooltip") &&
                        column.tooltip !== "" &&
                        "..."}
                    </StyledTableCell>
                  </Tooltip>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data?.length === 0 && (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              )}
              {visibleRows?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {props?.columns?.map((column, colIndex) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell
                          key={`${index}_${colIndex}`}
                          style={{
                            maxWidth: `${column.minWidth}px`,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          sx={{
                            background:
                              `${row[`${column.id}_bg`]} !important` ?? "",
                          }}
                        >
                          {/* {value} */}
                          {formatValue(value, column, row)}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: "0 5px",
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
            {props?.tableNote || ""}
          </Typography>
          <TablePagination
            component="div"
            count={props?.data?.length}
            page={page}
            showFirstButton
            showLastButton
            onPageChange={(event, page) => setPage(page)}
            rowsPerPage={defaultTableLimit}
            rowsPerPageOptions={[10]}
          />
        </Box>

        {/* <Pagination
          className="pagination-bar"
          currentPage={page}
          totalCount={props?.data?.length}
          pageSize={10}
          onPageChange={(page) => setPage(page)}
        /> */}
      </Paper>
    </>
  );
};

export default CustomTable;
