import React from "react";
import styled from "styled-components";
import Typography from "../atoms/Typography";
import Link from "@material-ui/core/Link";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

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
}) => (
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
      {/* <Link
        href="#"
        color="inherit"
        style={{ margin: "0", textDecoration: "none" }}
        onClick={(e) => {
          e.preventDefault();
          onSettingsClick();
        }}
      > */}
      <SettingsIcon onClick={() => onSettingsClick()} />
      {/* </Link> */}
    </Settings>

    {/* <Typography
      variant="h5"
      style={{ fontFamily: "Poppins, sans-serif", margin: "auto 0" }}
      gutterBottom
    >
      taggr
    </Typography>
    <Link
      href="#"
      color="inherit"
      style={{ margin: "auto 0", textDecoration: "none" }}
      onClick={(e) => {
        e.preventDefault();
        onSettingsClick();
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ fontFamily: "Open Sans", margin: "0" }}
      >
        Settings
      </Typography>
    </Link> */}
  </Wrapper>
);

export default Header;
