import {
  Grid,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
  Card,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MASTER_MENU } from "../../db/masterMenu";
import { Stack } from "@mui/system";
import { getMasterDataByEndPoint } from "../../http/masterRequests";
import {
  filterCustomTable,
  getTableColumnNames,
  showBasicToast,
} from "../../common/functions/function";
import { useEffect, useState } from "react";
import EnhancedTable from "./masterTable";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import SearchResultsNotFound from "../../common/components/searchResultsNotFound";
import { API_FAILURE_MSG } from "../../constants/errorText";
import { ADMIN_PANEL_ICON } from "../../constants/icons";
import MasterDialog from "./masterDialog";

const MasterHome = () => {
  const theme = useTheme();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [masterMenu, setMasterMenu] = useState(MASTER_MENU || []);
  const [tablePayload, setTablePayload] = useState({
    tableColumns: [],
    tableData: [],
    tableName: "",
    tableIcon: "",
    masterObject: null,
  });
  const [dialogProps, setDialogProps] = useState(null);

  const handleSearchInput = (searchedInput) => {
    if (
      searchedInput === "" ||
      searchedInput === null ||
      searchedInput === undefined
    ) {
      setMasterMenu(MASTER_MENU);
      return;
    }
    setMasterMenu(
      MASTER_MENU.filter((x) =>
        x.name
          .toString()
          .toLocaleLowerCase()
          .includes(searchedInput.toString().toLocaleLowerCase())
      )
    );
  };
  const handleMasterCardClick = (option) => {
    getMasterDataByEndPoint(option.apiEndPoint).then((res) => {
      if (res.status && res.status !== 200) {
        showBasicToast("error", res?.msg || API_FAILURE_MSG);
        return;
      }
      setTablePayload({
        tableColumns: getTableColumnNames(res.data),
        tableData: res.data,
        duplicateTableDta: res.data,
        tableName: option.name,
        tableIcon: option.icon,
        masterObject: option,
      });
    });
  };

  const handleTableSearchFilter = (searchTerm) => {
    setTablePayload((prev) => {
      return {
        ...prev,
        tableData:
          searchTerm?.length === 0
            ? prev.duplicateTableDta
            : filterCustomTable(
                prev.tableColumns,
                prev.duplicateTableDta,
                searchTerm
              ),
      };
    });
  };

  const handleAddBtnClick = (masterObj) => {
    console.log(masterObj);
    setDialogProps({ ...masterObj, selObj: null });
  };

  const handleEditBtnClick = (masterObj, selRows) => {
    setDialogProps({ ...masterObj, viewOnly: false, selObj: selRows[0] });
  };
  const handleViewBtnClick = (masterObj, selRows) => {
    setDialogProps({ ...masterObj, viewOnly: true, selObj: selRows[0] });
  };
  const handleDeleteBtnClick = (masterObj, selRows) => {
    console.log(selRows);
  };
  return (
    <>
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={showBackdrop}
      >
        <CircularProgress sx={{ color: "secondary.main" }} />
      </Backdrop>
      <Grid container spacing={1} direction={"row"}>
        <Grid item xs={12} sm={5}>
          <CustomHeaderWithSearchBar
            searchedInput={handleSearchInput}
            headerText={"Masters"}
            headerIcon={ADMIN_PANEL_ICON}
            placeholder={"Search Masters"}
          />

          {masterMenu.length === 0 ? <SearchResultsNotFound /> : null}
          <Grid container spacing={1}>
            {masterMenu?.map((option, index) => {
              return (
                <Grid
                  onClick={() => handleMasterCardClick(option)}
                  item
                  xs={5}
                  sm={3.7}
                  key={option.uniqueName}
                  sx={{
                    height: "80px",
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "10px",
                    p: 1,
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    background: (theme) =>
                      tablePayload.masterObject?.uniqueName ===
                      option.uniqueName
                        ? alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                          )
                        : "",
                    "&:hover": {
                      background: (theme) =>
                        alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                    },
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {option.icon}
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {option.name}
                    </Typography>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={7}>
          {tablePayload.tableName === "" ? null : (
            <EnhancedTable
              key={tablePayload.tableName}
              {...tablePayload}
              handleAddClick={(masterObj) => handleAddBtnClick(masterObj)}
              handleEditClick={(masterObj, selectedRows) =>
                handleEditBtnClick(masterObj, selectedRows)
              }
              handleViewClick={(masterObj, selectedRows) =>
                handleViewBtnClick(masterObj, selectedRows)
              }
              handleDeleteClick={(masterObj, selectedRows) =>
                handleDeleteBtnClick(masterObj, selectedRows)
              }
              filterTable={(val) => handleTableSearchFilter(val)}
            />
          )}
        </Grid>
      </Grid>

      {dialogProps ? (
        <MasterDialog
          {...dialogProps}
          closeDialog={() => setDialogProps(null)}
        />
      ) : null}
    </>
  );
};

export default MasterHome;
