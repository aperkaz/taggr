import React from "react";
import styled from "styled-components";
import { withStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SettingsIcon from "@mui/icons-material/Settings";

import Typography from "../atoms/Typography";

const Wrapper = styled.div`
  position: relative;
`;

const Settings = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;

  :hover {
    cursor: pointer;
  }
`;

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

type HeaderProps = {
  tabList: string[];
  activeTab: number;
  showSettings: boolean;
  onActiveTabChange: (tab: number) => void;
  onSettingsClick: () => void;
};

const Header = ({
  tabList,
  activeTab,
  showSettings,
  onActiveTabChange,
  onSettingsClick,
}: HeaderProps) => (
  <Wrapper>
    <Paper
      style={{
        background: `linear-gradient(354.71deg, rgba(135, 49, 232, 0.9) 0%, rgba(69, 40, 220, 0.9) 100%)`,
        boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)`,
        borderRadius: "6px",
      }}
    >
      <CustomTabs
        value={activeTab}
        onChange={(event, tab) => onActiveTabChange(tab)}
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
    {showSettings && (
      <Settings>
        <SettingsIcon
          fontSize="large"
          style={{ color: "white" }}
          onClick={onSettingsClick}
        />
      </Settings>
    )}
  </Wrapper>
);

export default Header;
