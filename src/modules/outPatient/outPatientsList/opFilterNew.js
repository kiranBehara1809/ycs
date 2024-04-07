import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { FILTER_ICON } from "../../../constants/icons";
import UnderDevelopment from "../../../common/components/underDevelopment";

export default function OpFiltersNew() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
        pt: 32,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <UnderDevelopment />
    </Box>
  );

  return (
    <React.Fragment key={"right"}>
      <Button
        onClick={toggleDrawer("right", true)}
        variant="contained"
        size="small"
        className="button registerNewButton"
        startIcon={FILTER_ICON}
      >
        Filter
      </Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
}
