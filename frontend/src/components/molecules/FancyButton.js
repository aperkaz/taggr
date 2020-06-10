import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "../atoms/Typography";

const FancyButton = ({ text = "", onClick = () => null }) => (
  <Button
    variant="outlined"
    size="large"
    style={{
      border: "none",
      background: "linear-gradient(70.98deg, #FE6B8B 9.38%, #FF8E53 91.67%)",
    }}
    onClick={onClick}
  >
    <Typography variant="subtitle1" style={{ color: "white" }}>
      {text}
    </Typography>
  </Button>
);

export default FancyButton;
