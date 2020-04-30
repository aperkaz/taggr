import React from "react";
import PropTypes from "prop-types";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import TagCountDisplay from "../molecules/TagCountDisplay";

// TODO: style: configure theme with typography and colors. Add provider this theme: https://material-ui.com/styles/advanced/#theming
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + {theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "20ch",
  },
}));

const Header = ({
  onInputChange,
  onPressReset,
  tagProcessingStatus,
  tagCountList,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h5"
              style={{
                fontFamily: "Pacifico",
              }}
            >
              taggr
            </Typography>
            <div className="{classes.grow}" />
            <div className="{classes.search}">
              <div className="{classes.searchIcon}">
                <SearchIcon />
              </div>
              <InputBase
                placeholder={
                  tagProcessingStatus ? tagProcessingStatus : "Search by tag"
                }
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => onInputChange(e.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Button
              style={{
                fontFamily: "Nunito",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
              }}
              onClick={onPressReset}
            >
              Reset
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ marginTop: "8px" }}>
        <TagCountDisplay tagCountList={tagCountList} />
      </div>
    </div>
  );
};

Header.defaultProps = {
  onInputChange: () => null,
  onPressReset: () => null,
  tagProcessingStatus: null,
  tagCountList: [],
};

Header.propTypes = {
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

export default Header;
