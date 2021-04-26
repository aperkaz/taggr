/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import MaterialTypography from "@material-ui/core/Typography";

const styles = {
  h1: { fontFamily: "Poppins, sans-serif" },
  h2: { fontFamily: "Poppins, sans-serif" },
  h3: { fontFamily: "Poppins, sans-serif" },
  h4: { fontFamily: "Poppins, sans-serif" },
  h5: { fontFamily: "Poppins, sans-serif" },
  h6: { fontFamily: "Poppins, sans-serif" },
  subtitle1: { fontFamily: "Open Sans" },
  subtitle2: { fontFamily: "Open Sans" },
  body1: { fontFamily: "Open Sans" },
  body2: { fontFamily: "Open Sans" },
  button: { fontFamily: "Open Sans", fontWeight: 600 },
  caption: { fontFamily: "Open Sans, sans-serif" },
  overline: { fontFamily: "Open Sans, sans-serif" },
};

const Typography = (props) => {
  const { variant, style: propStyles = {} } = props;

  return (
    <MaterialTypography
      variant={variant}
      style={{ ...styles[variant], ...propStyles, userSelect: "none" }}
    >
      {props.children}
    </MaterialTypography>
  );
};

export default Typography;
