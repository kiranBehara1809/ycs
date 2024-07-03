import React from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { TASKS_ICON } from "../../constants/icons";
import { Button } from "@mui/material";
import UnderDev from "../../common/components/underDev";

const Tasks = () => {
  const a = () => {
    console.log("aa");
  };
  return (
    <>
      <CustomHeaderWithSearchBar
        hideSearchBar
        headerText={"Tasks"}
        headerIcon={TASKS_ICON}
        html={
          <Button variant="contained" onClick={() => a()}>
            Add
          </Button>
        }
      />
      <UnderDev />
    </>
  );
};

export default Tasks;
