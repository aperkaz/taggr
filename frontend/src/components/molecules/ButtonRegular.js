import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "../atoms/Typography";

const ButtonRegular = ({
  text = "",
  onClick = () => null,
  style: styles = {},
}) => (
  <Button
    variant="outlined"
    size="large"
    style={{
      border: "none",
      background: "#95878A",
      ...styles,
    }}
    onClick={onClick}
  >
    <Typography variant="subtitle1" style={{ color: "white" }}>
      {text}
    </Typography>
  </Button>
);

export default ButtonRegular;
