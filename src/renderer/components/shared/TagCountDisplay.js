import React, { Component } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.25),
    },
  },
}));

const TagCountDisplay = ({ tagCountList = [], onTagClick = (t) => null }) => {
  const classes = useStyles();
  return tagCountList.length == 0 ? null : (
    <div className={classes.root}>
      <Typography
        variant="h5"
        style={{
          fontFamily: "Open Sans",
          marginRight: "1rem",
        }}
      >
        Popular tags:
      </Typography>
      {tagCountList.map((tag) => (
        <a
          key={tag.name}
          onClick={(e) => {
            e.preventDefault();
            onTagClick(tag.name);
          }}
        >
          <Chip avatar={<Avatar>{tag.count}</Avatar>} label={tag.name} />
        </a>
      ))}
    </div>
  );
};

TagCountDisplay.propTypes = {
  tagCountList: PropTypes.array,
};

export default TagCountDisplay;
