import React, { useEffect, useRef } from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { UI } from "../../constants/project";
import { USERS } from "../../db/dbUsers/users";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  alpha,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LocalizationProvider,
  DatePicker,
  dateCalendarClasses,
  datePickerToolbarClasses,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ADD_VITALS_ICON } from "../../constants/icons";
import { Controller, useForm } from "react-hook-form";
import { CATEGORIES } from "../../db/automobiles/metaDropdown";
import { styled } from "@mui/material/styles";
import { Close } from "@mui/icons-material";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(26px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        border: 0,
        border: `1px solid ${theme.palette.success.main}`,
        backgroundColor:
          theme.palette.mode === "dark"
            ? alpha(
                theme.palette.success.main,
                theme.palette.action.activatedOpacity
              )
            : alpha(
                theme.palette.success.main,
                theme.palette.action.activatedOpacity
              ),
        opacity: 1,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
      "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        backgroundColor: theme.palette.success.main,
        width: 22,
        height: 22,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      backgroundColor:
        theme.palette.mode === "light"
          ? theme.palette.grey[600]
          : theme.palette.grey[600],
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[400]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      cursor: "no-drop",
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor:
        theme.palette.mode === "light"
          ? theme.palette.grey[400]
          : theme.palette.grey[600],
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    backgroundColor: theme.palette.primary.main,
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    border: 0,
    width: "100px",
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          )
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const AddNewCar = (props) => {
  const theme = useTheme();
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

  useEffect(() => {
    if (props.selectedCar !== null) {
      for (const [key, value] of Object.entries(props.selectedCar)) {
        if (key === "carName") {
          setValue("carName", value ?? "");
        }
        if (key === "carDescription") {
          setValue("carDescription", value ?? "");
        }
        const carDetails = props.selectedCar?.carDetails || null;
        for (const [p_key, p_value] of Object.entries(carDetails)) {
          if (
            p_key === "receivedOn" ||
            p_key === "shouldBeReturnedOn" ||
            p_key === "embargoTill"
          ) {
            setValue(
              p_key,
              p_value !== null && p_value !== ""
                ? dayjs(new Date(p_value))
                : null
            );
          } else {
            setValue(p_key, p_value ?? false);
          }
        }
        const videoDetails = props.selectedCar?.videoDetails || null;
        for (const [v_key, v_value] of Object.entries(videoDetails)) {
          if (v_key === "editingCompletedOn" || v_key === "publishedOn") {
            setValue(
              v_key,
              v_value !== null && v_value !== ""
                ? dayjs(new Date(v_value))
                : null
            );
          } else if (v_key === "editedBy" || v_key === "thumbnailCreatedBy") {
            setValue(v_key, v_value || []);
          } else {
            const boolVal = typeof v_value;
            setValue(v_key, v_value ?? (boolVal === "boolean" ? false : ""));
          }
        }
      }
    }
  }, [props.selectedCar]);
  const handleClose = () => {
    props.closeAddNewCar(true);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Dialog
        open={true}
        onClose={() => handleClose()}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>
          <CustomHeaderWithSearchBar
            hideSearchBar
            headerText={"Add New Car"}
            headerIcon={ADD_VITALS_ICON}
            html={<Close onClick={handleClose} sx={{ cursor: "pointer" }} />}
          />
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form noValidate onSubmit={handleSubmit(onSubmit)} ref={formRef}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
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
                          message: "category is required",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            labelId="category-select-label"
                            required
                          >
                            {CATEGORIES.map((x, i) => {
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
                <Grid item xs={4}>
                  <Controller
                    name="carName"
                    control={control}
                    defaultValue={""}
                    rules={{
                      required: "Car Name is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Car Name"
                        size="small"
                        autoComplete="off"
                        variant={UI.fieldVariant}
                        error={!!errors.carName}
                        helperText={errors.carName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="carDescription"
                    control={control}
                    defaultValue={""}
                    rules={{
                      required: "Car Name is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="off"
                        fullWidth
                        label="Car Description"
                        size="small"
                        variant={UI.fieldVariant}
                        error={!!errors.carDescription}
                        helperText={errors.carDescription?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{
                    background: alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    ),
                    maxHeight: "40px !important",
                    height: "40px !important",
                    minHeight: "40px !important",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Car Information
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Controller
                        control={control}
                        name="receivedOn"
                        rules={{ required: "Received On is required" }}
                        defaultValue={null}
                        render={({
                          field: { onChange, value, ref },
                          fieldState,
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            label={"Received"}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: UI.fieldVariant,
                                helperText: fieldState?.error?.message,
                                error: Boolean(fieldState.error),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        control={control}
                        name="shouldBeReturnedOn"
                        rules={{}}
                        defaultValue={null}
                        render={({
                          field: { onChange, value, ref },
                          fieldState,
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            label={"Return By"}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: UI.fieldVariant,
                                helperText: fieldState?.error?.message,
                                error: Boolean(fieldState.error),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        control={control}
                        name="embargoTill"
                        rules={{}}
                        defaultValue={null}
                        render={({
                          field: { onChange, value, ref },
                          fieldState,
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            label={"Embargo Till"}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: UI.fieldVariant,
                                helperText: fieldState?.error?.message,
                                error: Boolean(fieldState.error),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Sent by Company/Individual?</InputLabel>
                      <Controller
                        name="sentByCompany"
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onChange={(e) => onChange(e)}
                            ref={ref}
                            checked={value}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Is Damaged?</InputLabel>
                      <Controller
                        name="isDamaged"
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onChange={(e) => onChange(e)}
                            ref={ref}
                            checked={value}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Is Returned?</InputLabel>
                      <Controller
                        name="isReturned"
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onChange={(e) => onChange(e)}
                            ref={ref}
                            checked={value}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary
                  sx={{
                    background: alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    ),
                    maxHeight: "40px !important",
                    height: "40px !important",
                    minHeight: "40px !important",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Video Information
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <FormControl
                        fullWidth
                        variant={UI.fieldVariant}
                        size="small"
                        error={!!errors.editedBy}
                      >
                        <InputLabel id="editedBy-select-label">
                          Assigned Editors
                        </InputLabel>
                        <Controller
                          name="editedBy"
                          control={control}
                          defaultValue={[]}
                          rules={{
                            required: {
                              value: true,
                              message: "Assigned Editors is required",
                            },
                          }}
                          render={({ field }) => (
                            <>
                              <Select
                                multiple
                                {...field}
                                labelId="editedBy-select-label"
                                required
                              >
                                {USERS.map((x, i) => {
                                  return (
                                    <MenuItem key={i} value={x.name}>
                                      {x.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              <FormHelperText>
                                {errors.editedBy?.message}
                              </FormHelperText>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl
                        fullWidth
                        variant={UI.fieldVariant}
                        size="small"
                        error={!!errors.thumbnailCreatedBy}
                      >
                        <InputLabel id="thumbnailCreatedBy-select-label">
                          Thumbnail Creators
                        </InputLabel>
                        <Controller
                          name="thumbnailCreatedBy"
                          control={control}
                          defaultValue={[]}
                          rules={{
                            required: {
                              value: true,
                              message: "Thumbnail Creators is required",
                            },
                          }}
                          render={({ field }) => (
                            <>
                              <Select
                                multiple
                                {...field}
                                labelId="thumbnailCreatedBy-select-label"
                                required
                              >
                                {USERS.map((x, i) => {
                                  return (
                                    <MenuItem key={i} value={x.name}>
                                      {x.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              <FormHelperText>
                                {errors.thumbnailCreatedBy?.message}
                              </FormHelperText>
                            </>
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <Controller
                        control={control}
                        name="editingCompletedOn"
                        rules={{}}
                        defaultValue={null}
                        render={({
                          field: { onChange, value, ref },
                          fieldState,
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            label={"Editing Completed On"}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: UI.fieldVariant,
                                helperText: fieldState?.error?.message,
                                error: Boolean(fieldState.error),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Controller
                        control={control}
                        name="publishedOn"
                        rules={{}}
                        defaultValue={null}
                        render={({
                          field: { onChange, value, ref },
                          fieldState,
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            ref={ref}
                            label={"Video Published On"}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: UI.fieldVariant,
                                helperText: fieldState?.error?.message,
                                error: Boolean(fieldState.error),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Video Uploaded?</InputLabel>
                      <Controller
                        name="videoUploaded"
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onChange={(e) => onChange(e)}
                            ref={ref}
                            checked={value}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InputLabel>Video Published?</InputLabel>
                      <Controller
                        name="videoPublished"
                        control={control}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <IOSSwitch
                            sx={{ m: 1 }}
                            onChange={(e) => onChange(e)}
                            ref={ref}
                            checked={value}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  mt: 1.5,
                }}
              >
                <Button type="submit" variant="contained">
                  Save
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  size="small"
                  color="secondary"
                  sx={{ marginLeft: "10px", textTransform: "capitalize" }}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewCar;
