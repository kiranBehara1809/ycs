import React from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { MARKET_OUTLOOK_ICON } from "../../constants/icons";
import UnderDev from "../../common/components/underDev";

const MarketOutlook = () => {
  return (
    <>
      <CustomHeaderWithSearchBar
        hideSearchBar
        headerText={"Market Outlook"}
        headerIcon={MARKET_OUTLOOK_ICON}
      />
      <UnderDev />
    </>
  );
};

export default MarketOutlook;
