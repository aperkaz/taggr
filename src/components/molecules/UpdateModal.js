const { app } = require("electron").remote;
let shell = require("electron").shell;

import React, { useEffect } from "react";
import semverCompare from "semver/functions/compare";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

// TODO: clean up styles
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UpdateModal = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: false,
    currentAppVersion: "v0.0.0",
    latestAppVersion: "v0.0.0",
  });

  const handleOpen = () => {
    setState((prev) => ({ ...prev, open: true }));
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  const fetchLatestAppVersion = async () => {
    var url = `https://api.github.com/repos/aperkaz/taggr-releases/tags`;
    const res = await fetch(url);

    res.json().then((tagList) => {
      const descendingOrderVersionTags = tagList.sort((v1, v2) => {
        return semverCompare(v2.name, v1.name);
      });

      const latestAppVersion = descendingOrderVersionTags[0].name;
      const currentAppVersion = `v${app.getVersion()}`;

      setState((prev) => ({
        ...prev,
        latestAppVersion,
        currentAppVersion,
      }));

      console.log(
        `Current version: ${currentAppVersion} | Latest version: ${latestAppVersion}`
      );

      // open modal if new version of app exists
      if (semverCompare(currentAppVersion, latestAppVersion) === -1) {
        handleOpen();
      }
    });
  };

  useEffect(() => {
    fetchLatestAppVersion();
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={state.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={state.open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Update available</h2>
          <p id="transition-modal-description">
            Current app version: {state.currentAppVersion}
            <br />
            New app version: {state.latestAppVersion}
          </p>
          <Button
            variant="outlined"
            size="large"
            style={{
              fontFamily: "Open Sans",
              fontWeight: 600,
              color: "white",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
            onClick={async (event) => {
              handleClose();
              event.preventDefault();
              shell.openExternal("https://taggr.ai");
            }}
          >
            Download new version
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
