import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Typography from "../atoms/Typography";

const CustomButtom = styled(({ ...other }) => (
  <Button variant="contained" size="large" {...other} />
))`
  color: white;
  background: linear-gradient(70.98deg, #95878a 9.38%, #95878a 91.67%);
`;

type Props = {
  text: string;
  extendedStyles: any;
  onClick: () => void;
};

const ButtonRegular = ({ text, onClick }: Props) => (
  <CustomButtom onClick={onClick}>
    <Typography variant="h6" style={{ color: "white" }}>
      {text}
    </Typography>
  </CustomButtom>
);

export default ButtonRegular;
