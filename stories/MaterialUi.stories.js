import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FullHeight from "./utils";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Types() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        component="h1"
        style={{ fontFamily: "Poppins, sans-serif" }}
        gutterBottom
      >
        h1. Heading
      </Typography>
      <Typography
        variant="h2"
        style={{ fontFamily: "Poppins, sans-serif" }}
        gutterBottom
      >
        h2. Heading
      </Typography>
      <Typography
        variant="h3"
        style={{ fontFamily: "Poppins, sans-serif" }}
        gutterBottom
      >
        h3. Heading
      </Typography>
      <Typography
        variant="h4"
        style={{ fontFamily: "Poppins, sans-serif" }}
        gutterBottom
      >
        h4. Heading
      </Typography>
      <Typography
        variant="h5"
        style={{ fontFamily: "Poppins, sans-serif" }}
        gutterBottom
      >
        h5. Heading
      </Typography>
      <Typography
        variant="h6"
        style={{ fontFamily: "Poppins, sans-serif" }}
        gutterBottom
      >
        h6. Heading
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ fontFamily: "Open Sans" }}
      >
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        style={{ fontFamily: "Open Sans" }}
      >
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontFamily: "Open Sans" }}
      >
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography
        variant="body2"
        style={{ fontFamily: "Open Sans" }}
        gutterBottom
      >
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography
        variant="button"
        style={{ fontFamily: "Open Sans", fontWeight: 600 }}
        display="block"
        gutterBottom
      >
        button text
      </Typography>
      <Typography
        variant="caption"
        display="block"
        style={{ fontFamily: "Open Sans, sans-serif" }}
        gutterBottom
      >
        caption text
      </Typography>
      <Typography
        variant="overline"
        style={{ fontFamily: "Open Sans, sans-serif" }}
        display="block"
        gutterBottom
      >
        overline text
      </Typography>
    </div>
  );
}

export default {
  title: "MaterialUI",
};

export const Typographies = () => (
  <FullHeight>
    <Types></Types>
  </FullHeight>
);

function TypesWhite() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        component="h2"
        style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        gutterBottom
      >
        h1. Heading
      </Typography>
      <Typography
        variant="h2"
        style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        gutterBottom
      >
        h2. Heading
      </Typography>
      <Typography
        variant="h3"
        style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        gutterBottom
      >
        h3. Heading
      </Typography>
      <Typography
        variant="h4"
        style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        gutterBottom
      >
        h4. Heading
      </Typography>
      <Typography
        variant="h5"
        style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        gutterBottom
      >
        h5. Heading
      </Typography>
      <Typography
        variant="h6"
        style={{ fontFamily: "Poppins, sans-serif", color: "white" }}
        gutterBottom
      >
        h6. Heading
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ fontFamily: "Open Sans", color: "white" }}
      >
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        style={{ fontFamily: "Open Sans", color: "white" }}
      >
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontFamily: "Open Sans", color: "white" }}
      >
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography
        variant="body2"
        style={{ fontFamily: "Open Sans", color: "white" }}
        gutterBottom
      >
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography
        variant="button"
        style={{ fontFamily: "Open Sans", fontWeight: 600, color: "white" }}
        display="block"
        gutterBottom
      >
        button text
      </Typography>
      <Typography
        variant="caption"
        display="block"
        style={{ fontFamily: "Open Sans, sans-serif", color: "white" }}
        gutterBottom
      >
        caption text
      </Typography>
      <Typography
        variant="overline"
        style={{ fontFamily: "Open Sans, sans-serif", color: "white" }}
        display="block"
        gutterBottom
      >
        overline text
      </Typography>
    </div>
  );
}

export const TypographiesWhite = () => (
  <FullHeight>
    <div style={{ background: "grey" }}>
      <TypesWhite></TypesWhite>
    </div>
  </FullHeight>
);

const useStylesButtons = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      fontFamily: "Open Sans",
      fontWeight: 600,
    },
  },
}));

export const Buttons = () => {
  const classes = useStylesButtons();

  return (
    <FullHeight>
      <div className={classes.root}>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" color="primary" href="#contained-buttons">
          Link
        </Button>

        <Button
          variant="outlined"
          size="large"
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            borderRadius: 3,
            border: 0,
            color: "white",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

            fontFamily: "Open Sans",
            fontWeight: 600,
          }}
        >
          Random button
        </Button>
      </div>
    </FullHeight>
  );
};
