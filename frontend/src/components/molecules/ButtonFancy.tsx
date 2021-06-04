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
  background: linear-gradient(70.98deg, #fe6b8b 9.38%, #ff8e53 91.67%);
  :hover {
    background: linear-gradient(70.98deg, #fe4e74 9.38%, #ff8a4d 91.67%);
  }
`;

type Props = {
  text: string;
  style: object;
  onClick: () => void;
};

const ButtonFancy = ({
  text = "",
  style: extendedStyles = {},
  onClick = () => null,
}: Props) => (
  <CustomButtom onClick={onClick} extendedStyles={extendedStyles}>
    <Typography variant="h6" style={{ color: "white" }}>
      {text}
    </Typography>
  </CustomButtom>
);

export default ButtonFancy;
