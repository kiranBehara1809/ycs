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
import { DOCTOR_MASTER_MENU, ROLES_USERS_MASTER_MENU } from "../../db/dbMasters/masterMenu";
import { Stack } from "@mui/system";
import { getMastersDataByEndPointNew } from "../../http/masterRequests";
import {
  filterCustomTable,
  getTableColumnNames,
} from "../../common/functions/function";
import { useEffect, useState } from "react";
import EnhancedTable from "./masterTable";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import SearchResultsNotFound from "../../common/components/searchResultsNotFound";
import { ADMIN_PANEL_ICON, DOCTOR_ICON } from "../../constants/icons";
import MasterDialog from "./masterDialog";

const RolesAndUsersMasterHome = () => {
  const theme = useTheme();
  const [masterMenu, setMasterMenu] = useState(ROLES_USERS_MASTER_MENU || []);
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
      setMasterMenu(ROLES_USERS_MASTER_MENU);
      return;
    }
    setMasterMenu(
      ROLES_USERS_MASTER_MENU.filter((x) =>
        x.name
          .toString()
          .toLocaleLowerCase()
          .includes(searchedInput.toString().toLocaleLowerCase())
      )
    );
  };
  const handleMasterCardClick = (option) => {
    getMastersDataByEndPointNew(option.apiEndPoint).then((res) => {
      if (res) {
        setTablePayload({
          tableColumns: getTableColumnNames(res),
          tableData: res,
          duplicateTableDta: res,
          tableName: option.name,
          tableIcon: option.icon,
          masterObject: option,
        });
      }
    });
  };

  const closeModalAndRenderTable = (obj) => {
    handleMasterCardClick(obj);
    refreshTable(obj);
    setDialogProps(null);
  };

  const refreshTable = (obj) => {
    setDialogProps({ uniqueName: "" });
    setTablePayload((prev) => {
      return {
        ...prev,
        tableName: "",
      };
    });
    setTimeout(() => {
      setTablePayload((prev) => {
        return {
          ...prev,
          tableName: obj.name,
        };
      });
      setDialogProps(null);
    }, 30);
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
    setDialogProps({ ...masterObj, dialogType: "add", selObj: null });
  };

  const handleEditBtnClick = (masterObj, selRows) => {
    setDialogProps({ ...masterObj, dialogType: "edit", selObj: selRows[0] });
  };

  const handleViewBtnClick = (masterObj, selRows) => {
    setDialogProps({ ...masterObj, dialogType: "view", selObj: selRows[0] });
  };

  const handleDeleteBtnClick = (masterObj, selRows) => {
    setDialogProps({ ...masterObj, dialogType: "delete", selObj: selRows[0] });
  };

  return (
    <>
      <Grid container spacing={0.5} direction={"row"} sx={{width : "calc(100vw - 53px) !important"}}>
        <Grid item xs={12} sm={4.5}>
          <CustomHeaderWithSearchBar
            searchedInput={handleSearchInput}
            headerText={"Roles And Users"}
            headerIcon={DOCTOR_ICON}
            placeholder={"Search Roles And Users"}
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
                    borderBottom:
                      tablePayload.masterObject?.uniqueName ===
                      option.uniqueName
                        ? `1.5px solid ${theme.palette.primary.main} !important`
                        : "",
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

        <Grid item xs={12} sm={7.5}>
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
          closeModalAndRenderTable={(dataObj) =>
            closeModalAndRenderTable(dataObj)
          }
        />
      ) : null}
    </>
  );
};

export default RolesAndUsersMasterHome;
