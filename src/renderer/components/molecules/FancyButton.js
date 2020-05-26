import React from "react";
import Button from "@material-ui/core/Button";

const FancyButton = ({ text = "", onClick = () => null }) => (
  <Button
    variant="outlined"
    size="large"
    style={{
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "white",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default FancyButton;
