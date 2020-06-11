import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

const NavBar = ({ value = 0, tabs = [], onChange = (i) => null }) => (
  <Paper
    style={{
      background: `linear-gradient(354.71deg, rgba(135, 49, 232, 0.9) 0%, rgba(69, 40, 220, 0.9) 100%)`,
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)`,
    }}
  >
    <CustomTabs value={value} onChange={(event, tab) => onChange(tab)} centered>
      {tabs.map((tab, index) => (
        <CustomTab
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
