import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Typography from "../atoms/Typography";

const CustomButton = withStyles({
  root: {
    minWidth: 200,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    "&:hover": {
      transform: "scale(1.1)",
    },
    transition: "0.3s cubic-bezier(0.47, 1.64, 0.41, 0.8)",
    "&:hover": {
      boxShadow: "none",
      transform: "scale(1.05)",
    },
  },
  label: {
    color: "white",
    textTransform: "none",
    fontSize: 15,
    fontWeight: 700,
  },
  contained: {
    minHeight: 30,
  },
})(Button);

const ButtonRegular = ({ text, style = {}, onClick = () => null }) => (
  <CustomButton onClick={onClick} style={style}>
    <Typography variant="h6" style={{ color: "white" }}>
      {text}
    </Typography>
  </CustomButton>
);

export default ButtonRegular;
