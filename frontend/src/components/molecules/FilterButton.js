import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const FilterButton = ({
  text = "",
  active = false,
  disabled = false,
  onClick = () => null,
}) => (
  <Button
    variant="outlined"
    disabled={disabled}
    style={{
      margin: "4px",
      minWidth: "130px",
      textTransform: "capitalize",
      background: active
        ? "linear-gradient(45deg, rgb(254, 107, 139,0.6) 20%, rgb(255, 142, 83,0.6) 90%)"
        : "white",
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
