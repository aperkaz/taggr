import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Typography from "../atoms/Typography";

const CustomButtom = styled(
  ({ style, ...other }: React.ComponentProps<typeof Button>) => (
    <Button variant="contained" size="large" {...other} />
  )
)`
  color: white;
  background: linear-gradient(70.98deg, #fe6b8b 9.38%, #ff8e53 91.67%);
  :hover {
    background: linear-gradient(70.98deg, #fe4e74 9.38%, #ff8a4d 91.67%);
  }
`;
type Props = {
  text: string;
  style?: React.ComponentProps<typeof Button>;
  onClick: () => void;
};

const ButtonFancy = ({ text, style = {}, onClick }: Props) => (
  <CustomButtom onClick={onClick} style={style}>
    <Typography variant="h6" style={{ color: "white" }}>
      {text}
    </Typography>
  </CustomButtom>
);

export default ButtonFancy;
