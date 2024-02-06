import React, { useState, useEffect } from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { SETTINGS_ICON } from "../../constants/icons";

const SettingsHome = () => {
  return (
    <>
      <CustomHeaderWithSearchBar
        headerText="Settings"
        headerIcon={SETTINGS_ICON}
        placeholder="Search Settings"
      />
    </>
  );
};

export default SettingsHome;
