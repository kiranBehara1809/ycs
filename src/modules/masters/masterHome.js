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
  getTableColumnNames,
  showBasicToast,
} from "../../common/functions/function";
import { useState } from "react";
import EnhancedTable from "./masterTable";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import SearchResultsNotFound from "../../common/components/searchResultsNotFound";
import { API_FAILURE_MSG } from "../../constants/errorText";
import { ADMIN_PANEL_ICON } from "../../constants/icons";

const MasterHome = () => {
  const theme = useTheme();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [masterMenu, setMasterMenu] = useState(MASTER_MENU || []);
  const [tablePayload, setTablePayload] = useState({
    tableColumns: [],
    tableData: [],
    tableName: "",
    tableIcon: "",
  });

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
    setShowBackdrop(true);
    getMasterDataByEndPoint(option.apiEndPoint).then((res) => {
      if (res?.statusCode === 200) {
        setTablePayload({
          tableColumns: getTableColumnNames(res.data),
          tableData: res.data,
          tableName: option.name,
          tableIcon: option.icon,
        });
        setShowBackdrop(false);
      } else {
        setShowBackdrop(false);
        showBasicToast("error", res?.msg || API_FAILURE_MSG);
        return;
      }
    });
  };

  const handleAddBtnClick = (masterName) => {
    alert(masterName);
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
        <Grid item xs={12} sm={6}>
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
                  key={index}
                  sx={{
                    height: "80px",
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "10px",
                    p: 1,
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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

        <Grid item xs={12} sm={6}>
          {tablePayload.tableName === "" ? null : (
            <EnhancedTable
              {...tablePayload}
              handleAddClick={(masterName) => handleAddBtnClick(masterName)}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MasterHome;
