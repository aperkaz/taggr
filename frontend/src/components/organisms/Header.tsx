import React from "react";
import styled from "styled-components";
import Link from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

import Typography from "../atoms/Typography";
import TaskProgress from "../molecules/TaskProgress";

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

type Props = {
  task: {
    isOngoing: boolean;
    name: string;
    percentage: number;
  };
  onFiltersClick: () => null;
  onSettingsClick: () => null;
};

const Header = ({
  task: {
    isOngoing: isTaskOngoing = true,
    name: taskName = "not defined ",
    percentage: taskPercentage = 0,
  },
  onFiltersClick = () => null,
  onSettingsClick = () => null,
}: Props) => {
  return isTaskOngoing ? (
    <TaskProgress name={taskName} percentage={taskPercentage} />
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
