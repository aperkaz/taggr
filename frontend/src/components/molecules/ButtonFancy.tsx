import React from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import Typography from "../atoms/Typography";

const CustomButton = withStyles({
  root: {
    minWidth: 200,
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    background:
      /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      "linear-gradient(to right, #FFC371, #FF5F6D)",
    "&:hover": {
      transform: "scale(1.05)",
    },
    boxShadow: "4px 4px 8px #1f1f1f",
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

type Props = {
  text: string;
  style?: React.ComponentProps<typeof Button> & React.CSSProperties;
  onClick: () => void;
};

const ButtonFancy = ({
  text = "",
  style = {},
  onClick = () => null,
}: Props) => (
  <CustomButton onClick={onClick} style={style}>
    <Typography variant="h6" style={{ color: "white" }}>
      {text}
    </Typography>
  </CustomButton>
);

export default ButtonFancy;
