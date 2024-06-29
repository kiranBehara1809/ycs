import React, { useEffect, useState } from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import { HOME_ICON } from "../../constants/icons";
import EnhancedTable from "../../common/components/customTable";
import { toTitleCase } from "../../common/functions/function";

const DashboardHome = () => {
  const [cols, setCols] = useState([]);
  const [data, setData] = useState(
    Array(100)
      .fill()
      .map((x) => {
        return {
          name: crypto.randomUUID().toString().substring(0, 4),
          age: crypto.randomUUID().toString().substring(0, 4),
          gender: crypto.randomUUID().toString().substring(0, 4),
          a: crypto.randomUUID().toString().substring(0, 4),
          b: crypto.randomUUID().toString().substring(0, 4),
          c: crypto.randomUUID().toString().substring(0, 4),
          d: crypto.randomUUID().toString().substring(0, 4),
          e: crypto.randomUUID().toString().substring(0, 4),
          f: crypto.randomUUID().toString().substring(0, 4),
          g: crypto.randomUUID().toString().substring(0, 4),
          h: crypto.randomUUID().toString().substring(0, 4),
          i: crypto.randomUUID().toString().substring(0, 4),
          j: crypto.randomUUID().toString().substring(0, 4),
          k: crypto.randomUUID().toString().substring(0, 4),
          l: crypto.randomUUID().toString().substring(0, 4),
          lu: crypto.randomUUID().toString().substring(0, 4),
          lus: crypto.randomUUID().toString().substring(0, 4),
          as: crypto.randomUUID().toString().substring(0, 4),
          assa: crypto.randomUUID().toString().substring(0, 4),
          assaSF: crypto.randomUUID().toString().substring(0, 4),
          assaSFdvdf: crypto.randomUUID().toString().substring(0, 4),
        };
      })
  );
  useEffect(() => {
    const singleRow = data && Object.keys(data?.[0]);
    setCols(
      singleRow?.map((x) => {
        return {
          id: x,
          label: toTitleCase(x),
        };
      })
    );
  }, [data]);
  return (
    <>
      <CustomHeaderWithSearchBar
        hideSearchBar
        headerText={"Home Dashboard"}
        headerIcon={HOME_ICON}
      />
      {/* <UnderDev /> */}
      {data && (
        <EnhancedTable
          columns={cols}
          data={data}
          maxHeight={"auto"}
          rowsPerPage={15}
        />
      )}
    </>
  );
};

export default DashboardHome;
