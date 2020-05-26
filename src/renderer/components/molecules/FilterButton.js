import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const FilterButton = ({ text = "", onClick = () => null }) => (
  <Button
    variant="outlined"
    style={{
      margin: "4px",
      minWidth: "130px",
      textTransform: "capitalize",
    }}
    onClick={onClick}
  >
    <Typography
      variant="subtitle2"
      style={{ fontFamily: "Open Sans" }}
      gutterBottom
    >
      {text}
    </Typography>
  </Button>
);

export default FilterButton;
