import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "../atoms/Typography";

const ButtonFilter = ({
  icon,
  text = "",
  active = false,
  disabled = false,
  onClick = () => null,
  style: styles = {},
}) => (
  <Button
    variant="outlined"
    size="small"
    startIcon={icon}
    disabled={disabled}
    style={{
      minWidth: "130px",
      textTransform: "capitalize",
      background: active
        ? "linear-gradient(70.98deg, #FE6B8B 9.38%, #FF8E53 91.67%)"
        : "white",
      ...styles,
    }}
    onClick={onClick}
  >
    <Typography variant="subtitle1">{text}</Typography>
  </Button>
);

export default ButtonFilter;
