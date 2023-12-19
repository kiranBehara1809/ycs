import React, { usrState, useEffect } from "react";
import GetMasterDialog from "./getMasterDialog";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomDialogHeader from "../../common/components/customDialogHeader";

const MasterDialog = (props) => {
  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      props.closeDialog();
    }
  };
  const tilePrefix = props?.selObj ? (props?.viewOnly ? "View " : "Edit ") : "Add "

  return (
    <>
      <Dialog
        open={props?.uniqueName?.length > 0 || false}
        maxWidth={"xs"}
        fullWidth
        autoFocus
        disableEscapeKeyDown
        onClose={handleDialogClose}
      >
        <CustomDialogHeader
          headerIcon={props.icon}
          headerTitle={`${tilePrefix} ${props?.name}`}
          closeDialog={handleDialogClose}
        />
        <DialogContent sx={{ mt: -1 }}>
          <GetMasterDialog {...props} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MasterDialog;
