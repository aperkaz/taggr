import React from "react";
import styled from "styled-components";
import Typography from "../atoms/Typography";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

import ProgressBar from "../molecules/ProgressBar";

const Wrapper = styled.div`
  min-height: 40px;

  display: flex;
  justify-content: space-between;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
`;

const Settings = styled.div`
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const Header = ({
  onFiltersClick = () => null,
  onSettingsClick = () => null,
  task: {
    isOngoing: isTaskOngoing = true,
    name: taskName = "not defined ",
    percentage: taskPercentage = 0,
  },
}) => {
  return isTaskOngoing ? (
    <ProgressBar name={taskName} percentage={taskPercentage} />
  ) : (
    <Wrapper>
      <Link
        href="#"
        color="inherit"
        style={{ margin: "auto 0", textDecoration: "none" }}
        onClick={(e) => {
          e.preventDefault();
          onFiltersClick();
        }}
      >
        <Filters>
          <MenuIcon />
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", paddingLeft: ".5em" }}
          >
            Filters
          </Typography>
        </Filters>
      </Link>
      <Settings>
        <SettingsIcon onClick={() => onSettingsClick()} />
      </Settings>
    </Wrapper>
  );
};

export default Header;
