import React from "react";
import Button from "@mui/material/Button";
import Typography from "../atoms/Typography";

type Props = {
  text: string;
  styles?: React.ComponentProps<typeof Button>;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
};

const ButtonFilter = ({
  text,
  styles,
  disabled = false,
  active = false,
  onClick,
}: Props) => (
  <Button
    variant="outlined"
    size="small"
    disabled={disabled}
    style={{
      minWidth: "115px",
      textTransform: "capitalize",
      background: active
        ? "linear-gradient(70.98deg, #fe7996 9.38%, #ff9964 91.67%)"
        : "white",
      margin: "auto",
      boxShadow: "4px 4px 8px lightgrey",
      ...styles,
    }}
    onClick={onClick}
  >
    <Typography variant="subtitle1">{text}</Typography>
  </Button>
);

export default ButtonFilter;
