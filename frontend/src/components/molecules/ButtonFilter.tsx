import React from "react";
import Button from "@mui/material/Button";
import Typography from "../atoms/Typography";

type Props = {
  text: string;
  styles: React.ComponentProps<typeof Button>;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick: () => null;
};

const ButtonFilter = ({
  text,
  styles,
  icon,
  disabled = false,
  active = false,
  onClick,
}: Props) => (
  <Button
    variant="outlined"
    size="small"
    startIcon={icon}
    disabled={disabled}
    style={{
      minWidth: "130px",
      textTransform: "capitalize",
      background: active
        ? "linear-gradient(70.98deg, #fe7996 9.38%, #ff9964 91.67%)"
        : "white",
      ...styles,
    }}
    onClick={onClick}
  >
    <Typography variant="subtitle1">{text}</Typography>
  </Button>
);

export default ButtonFilter;
