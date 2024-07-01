import React, { useEffect, useRef, useState } from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import EnhancedTable from "../../common/components/customTable";
import {
  LocalizationProvider,
  DatePicker,
  dateCalendarClasses,
  datePickerToolbarClasses,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AMC_LIST,
  ENDED_DROPDOWN_LIST,
  PRIMARY_CATEGORY_LIST,
  SUB_CATEGORY_LIST,
} from "../../db/fundAnalysis/fundReviewDb";
import { USER_ICON } from "../../constants/icons";

const COLUMN_GROUPS = [
  {
    id: "",
    colSpan: 2,
  },
  {
    id: "Riskometer",
    colSpan: 2,
    sx: { border: "0.5px solid" },
  },
  {
    id: "Latest Nav",
    colSpan: 2,
    sx: { border: "0.5px solid" },
  },
  {
    id: "Return %",
    colSpan: 3,
    sx: { border: "0.5px solid" },
  },
  {
    id: "",
    colSpan: 1,
  },
];

const COLUMNS = [
  {
    id: "scheme",
    label: "Scheme",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "benchmark",
    label: "Benchmark",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "risk_meter_scheme",
    label: "Scheme",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "risk_meter_benchmark",
    label: "Benchmark",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "latestNav_regular",
    label: "Regular",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "latestNav_direct",
    label: "Direct",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "return_per_regular",
    label: "Regular",
    minWidth: "100px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "return_per_direct",
    label: "Direct",
    minWidth: "100px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "return_per_benchmark",
    label: "Benchmark",
    minWidth: "100px",
    sx: { border: "0.5px solid" },
  },
  {
    id: "dailyAum",
    label: "Daily AUM",
    minWidth: "170px",
    sx: { border: "0.5px solid" },
  },
];

const FundReview = () => {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    setFocus,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "all",
  });
  const formRef = useRef(null);
  const [subCategories, setSubCategories] = useState([]);
  const filterSubCategories = (cat) => {
    setSubCategories(SUB_CATEGORY_LIST[cat]);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getRiskColBg = (risk) => {
    let returnColor = "";
    switch (risk) {
      case "High":
        returnColor = "#ff000073";
        break;
      case "Very High":
        returnColor = "#ff0000a3";
        break;
      case "Moderately High":
        returnColor = "#ff000038";
        break;
      case "Medium":
        returnColor = "#da853e85";
        break;
      case "Low":
        returnColor = "#52da3e38";
        break;
      default:
        returnColor = "transparent";
    }
    return returnColor;
  };
  const [data, setData] = useState(
    Array(50)
      .fill()
      .map((x) => {
        const r1 = ["Nifty", "Crisil"];
        const r2 = ["Total", " Hybrid"];
        const r3 = ["High", "Very High", "Moderately High", "Medium", "Low"];
        const riskCol1 = r3[Math.floor(Math.random() * r3.length)];
        const riskCol2 = r3[Math.floor(Math.random() * r3.length)];
        return {
          scheme: AMC_LIST[Math.floor(Math.random() * AMC_LIST.length)]?.label,
          benchmark: `${r1[Math.floor(Math.random() * r1.length)]} 500 ${
            r2[Math.floor(Math.random() * r2.length)]
          } Return Index`,
          risk_meter_scheme: riskCol1,
          risk_meter_benchmark: riskCol2,
          risk_meter_scheme_bg: getRiskColBg(riskCol1),
          risk_meter_benchmark_bg: getRiskColBg(riskCol2),
          latestNav_regular: faker.finance.amount({
            min: 5,
            max: 500,
            dec: 4,
          }),
          latestNav_direct: faker.finance.amount({
            min: 5,
            max: 500,
            dec: 4,
          }),
          return_per_regular: faker.finance.amount({
            min: 5,
            max: 30,
            dec: 2,
          }),
          return_per_direct: faker.finance.amount({
            min: 5,
            max: 30,
            dec: 2,
          }),
          return_per_benchmark: faker.finance.amount({
            min: 5,
            max: 30,
            dec: 2,
          }),
          dailyAum: faker.finance.amount({
            min: 5,
            max: 10000,
            dec: 2,
          }),
        };
      })
  );
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form noValidate onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <Grid
            container
            spacing={2}
            sx={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Grid item xs={2}>
              <FormControl
                fullWidth
                variant="standard"
                size="small"
                error={!!errors.ended}
              >
                <InputLabel id="ended-select-label">Ended</InputLabel>
                <Controller
                  name="ended"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: {
                      value: true,
                      message: "Ended is required",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Select {...field} labelId="ended-select-label" required>
                        {ENDED_DROPDOWN_LIST.map((x, i) => {
                          return (
                            <MenuItem key={i} value={x.id}>
                              {x.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>{errors.ended?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                fullWidth
                variant="standard"
                size="small"
                error={!!errors.category}
              >
                <InputLabel id="category-select-label">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: {
                      value: true,
                      message: "Categrory is required",
                    },
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <>
                      <Select
                        onChange={(e) => {
                          onChange(e);
                          filterSubCategories(e.target.value);
                        }}
                        value={value}
                        ref={ref}
                        labelId="category-select-label"
                        required
                      >
                        {PRIMARY_CATEGORY_LIST.map((x, i) => {
                          return (
                            <MenuItem key={i} value={x.id}>
                              {x.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>
                        {errors.category?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                fullWidth
                variant="standard"
                size="small"
                error={!!errors.subCategory}
              >
                <InputLabel id="subCategory-select-label">
                  Sub Category
                </InputLabel>
                <Controller
                  name="subCategory"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: {
                      value: true,
                      message: "Sub Categrory is required",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        labelId="subCategory-select-label"
                        required
                      >
                        {subCategories.map((x, i) => {
                          return (
                            <MenuItem key={i} value={x.id}>
                              {x.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>
                        {errors.subCategory?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl
                fullWidth
                variant="standard"
                size="small"
                error={!!errors.amc}
              >
                <InputLabel id="amc-select-label">AMC</InputLabel>
                <Controller
                  name="amc"
                  control={control}
                  defaultValue={""}
                  rules={{
                    required: {
                      value: true,
                      message: "AMC is required",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Select {...field} labelId="amc-select-label" required>
                        {AMC_LIST.map((x, i) => {
                          return (
                            <MenuItem key={i} value={x.id}>
                              {x.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>{errors.amc?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} sx={{ mt: "-8px" }}>
              <Controller
                control={control}
                name="nav_date"
                rules={{ required: "Nav Date is required" }}
                defaultValue={null}
                render={({ field: { onChange, value, ref }, fieldState }) => (
                  <DatePicker
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    label={"Nav Date"}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "standard",
                        helperText: fieldState?.error?.message,
                        error: Boolean(fieldState.error),
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              <Button size="small" type="submit" variant="contained" fullWidth>
                Filter
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                size="small"
                variant="contained"
                fullWidth
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Query
              </Button>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
      <Grid container sx={{ mt: 2 }}>
        <Grid
          item
          xs={12}
          sx={{
            maxWidth: "100% !important",
          }}
        >
          <EnhancedTable
            columns={COLUMNS}
            columnGroups={COLUMN_GROUPS}
            data={data}
            maxHeight={"auto"}
            rowsPerPage={15}
            tableNote={"Note: ^AUM disclosure as on 27-06-2024"}
          />
        </Grid>
      </Grid>
      <Popover
        id={"Query-Run_popover"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 1, minWidth: "400px", width: "400px" }}>
          <CustomHeaderWithSearchBar
            hideSearchBar
            headerText={"LLM Query Input"}
            headerIcon={USER_ICON}
          />
          <Typography variant="h6" sx={{fontSize : '13px', pt:0.5}}>What is Birla fund NAV (input1)?</Typography>
          <Typography variant="h6" sx={{fontSize : '13px', pt:0.5}}>
            What is holdings of Birla Equity Fund (input2)?
          </Typography>
          <Typography variant="h6" sx={{fontSize : '13px', pt:0.5}}>
            Any market news impacting Birl Equity Fund (input3)
          </Typography>
          <Box sx={{display : "flex", justifyContent : "flex-end"}}>
            <Button variant="contained">Run</Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default FundReview;
