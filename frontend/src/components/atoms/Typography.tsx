import React from "react";
import MaterialTypography from "@mui/material/Typography";

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
  inherit: { fontFamily: "Open Sans, sans-serif" },
};

const Typography = (props: React.ComponentProps<typeof MaterialTypography>) => {
  const { variant, style: propStyles = {} } = props;

  return (
    <MaterialTypography
      variant={variant}
      style={{ ...styles[variant ? variant : "h1"], ...propStyles }}
    >
      {props.children}
    </MaterialTypography>
  );
};

export default Typography;
