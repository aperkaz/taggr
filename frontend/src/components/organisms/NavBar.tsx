import React from "react";
import { withStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Typography from "../atoms/Typography";

const CustomTabs = withStyles({
  indicator: {
    backgroundColor: "white",
    marginBottom: "5px",
  },
})(Tabs);

const CustomTab = withStyles({
  root: {
    textTransform: "none",
  },
})(Tab);

type Props = {
  tabList: string[];
  activeTab: number;
  handleChange: (i: number) => void;
};

const NavBar = ({ tabList, activeTab, handleChange }: Props) => (
  <Paper
    style={{
      background: `linear-gradient(354.71deg, rgba(135, 49, 232, 0.9) 0%, rgba(69, 40, 220, 0.9) 100%)`,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)`,
    }}
  >
    <CustomTabs
      value={activeTab}
      onChange={(event, tab) => handleChange(tab)}
      centered
    >
      {tabList.map((tab, index) => (
        <CustomTab
          key={index}
          label={
            <Typography variant="h5" style={{ color: "white" }}>
              {tab}
            </Typography>
          }
        />
      ))}
    </CustomTabs>
  </Paper>
);

export default NavBar;
