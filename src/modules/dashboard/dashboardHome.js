import React from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import UnderDev from "../../common/components/underDev";
import { HOME_ICON } from "../../constants/icons";

const DashboardHome = () => {
  return (
    <>
      <CustomHeaderWithSearchBar
        hideSearchBar
        headerText={"Home Dashboard"}
        headerIcon={HOME_ICON}
      />
      <UnderDev />
    </>
  );
};

export default DashboardHome;
