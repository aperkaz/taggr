import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "../atoms/Typography";

const CustomButtom = styled(({ extendedStyles, ...other }) => (
  <Button
    variant="contained"
    size="large"
    {...other}
    style={{ ...extendedStyles }}
  />
))`
  color: white;
  background: linear-gradient(70.98deg, #95878a 9.38%, #95878a 91.67%);
`;

const ButtonRegular = ({
  text,
  style: extendedStyles = {},
  onClick = () => null,
}) => (
  <CustomButtom onClick={onClick} extendedStyles={extendedStyles}>
    <Typography variant="h6" style={{ color: "white" }}>
      {text}
    </Typography>
  </CustomButtom>
);

export default ButtonRegular;
