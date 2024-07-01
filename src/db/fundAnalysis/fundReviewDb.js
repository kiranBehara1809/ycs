const ENDED_DROPDOWN_LIST = [
  {
    label: "Open Ended",
    id: "open-ended",
  },
  {
    label: "Closed End",
    id: "closed-end",
  },
];
const PRIMARY_CATEGORY_LIST = [
  {
    label: "Equity",
    id: "equity",
  },
  {
    label: "Debt",
    id: "debt",
  },
  {
    label: "Hybrid",
    id: "hybrid",
  },
  {
    label: "Solution Oriented",
    id: "solutionOriented",
  },
  {
    label: "Other",
    id: "other",
  },
];
const SUB_CATEGORY_LIST = {
  equity: [
    {
      label: "Large Cap",
      id: "largeCap",
    },
    {
      label: "Large & Mid cap",
      id: "largeAndMidCap",
    },
    {
      label: "Flexi Cap",
      id: "flexiCap",
    },
  ],
  debt: [
    {
      label: "Long Duration",
      id: "longDuration",
    },
    {
      label: "Medium to Long Duration",
      id: "mediumToLongDuration",
    },
    {
      label: "Medium Duration",
      id: "mediumDuration",
    },
    {
      label: "Short Duration",
      id: "shortDuration",
    },
  ],
  hybrid: [
    {
      label: "Agressive Hybrid",
      id: "aggresiveHybrid",
    },
    {
      label: "Balanced Hybrid",
      id: "balancedHybrid",
    },
    {
      label: "Conservative Hybrid",
      id: "conservativeHybrid",
    },
  ],
  solutionOriented: [
    {
      label: "Children's",
      id: "children",
    },
    {
      label: "Retirement",
      id: "retirement",
    },
  ],
  other: [
    {
      label: "Index Funds/ETF",
      id: "indexFunds_etf",
    },
    {
      label: "FoFs (Domestic/Overseas)",
      id: "fofs_dom_over",
    },
  ],
};
const AMC_LIST = [
  {
    label: "All",
    id: "all",
  },
  {
    label: "360 ONE Mutual Fund",
    id: "360_one_mutual_fund",
  },
  {
    label: "Aditya Birla Sun Life Mutual Fund",
    id: "aditya_birla_sun_life_mutual_fund",
  },
  {
    label: "Axis Mutual Fund",
    id: "axis_mutual_fund",
  },
  {
    label: "Bajaj Finserv Mutual Fund",
    id: "bajaj_finserv_mutual_fund",
  },
];

export {
  ENDED_DROPDOWN_LIST,
  PRIMARY_CATEGORY_LIST,
  SUB_CATEGORY_LIST,
  AMC_LIST,
};
