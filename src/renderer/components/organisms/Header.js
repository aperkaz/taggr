import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Wrapper = styled.div`
  min-height: 40px;
  padding: 0 1em;

  background: linear-gradient(
    355.93deg,
    rgba(135, 49, 232, 0.9) 0%,
    rgba(69, 40, 220, 0.9) 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12);
  color: white;

  display: flex;
  justify-content: space-between;
`;

const Div = styled.div`
  margin: auto 0;
`;

const Header = ({ onSettingsClick }) => (
  <Wrapper>
    <Typography
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
    </Link>
  </Wrapper>
);

Header.PropTypes = {
  onSettingsClick: PropTypes.func.isRequired,
};

export default Header;
