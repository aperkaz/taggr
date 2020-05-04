import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Logo from "../molecules/Logo";
import TagCountDisplay from "../molecules/TagCountDisplay";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
`;

const HeaderComp = ({
  onLogoClick,
  onInputChange,
  onPressReset,
  tagProcessingStatus,
  tagCountList,
}) => {
  return (
    <div>
      <Header>
        <Logo onClick={onLogoClick} />
        <TextField
          id="outlined-basic"
          label={tagProcessingStatus ? tagProcessingStatus : "Tags"}
          variant="outlined"
          placeholder={
            tagProcessingStatus ? tagProcessingStatus : "Search by tag"
          }
          onChange={(e) => onInputChange(e.target.value)}
        />
        <Button
          style={{
            fontFamily: "Open Sans",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            fontWeight: 600,
            color: "white",
            width: "6rem",
          }}
          onClick={onPressReset}
        >
          Reset
        </Button>
      </Header>
      <div style={{ marginTop: "8px" }}>
        <TagCountDisplay tagCountList={tagCountList} />
      </div>
    </div>
  );
};

HeaderComp.defaultProps = {
  onInputChange: () => null,
  onPressReset: () => null,
  tagProcessingStatus: null,
  tagCountList: [],
};

HeaderComp.propTypes = {
  onInputChange: PropTypes.func,
  onPressReset: PropTypes.func,
  tagProcessingStatus: PropTypes.any,
  tagCountList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ),
};

export default HeaderComp;
