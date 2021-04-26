// @ts-nocheck
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import semverCompare from "semver/functions/compare";

import ButtonFancy from "./ButtonFancy";
import Typography from "../atoms/Typography";

import logger from "../../../shared/logger";

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
    textAlign: "center",
  },
}));

const UpdateModal = ({
  currentAppVersion = "v0.0.0",
  latestAppVersion = "v0.0.0",
  onUpdateSelect = () => null,
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (semverCompare(currentAppVersion, latestAppVersion) === -1) {
        setIsOpen(true);
      }
    } catch (e) {
      logger.error(`[FE] Invalid semver in UpdateModal: ${JSON.stringify(e)}`);
    }
  }, [currentAppVersion, latestAppVersion]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Typography variant="h3">Update available</Typography>
          <Typography variant="subtitle1">
            Current app version: {currentAppVersion}
          </Typography>
          <Typography variant="subtitle1">
            New app version: {latestAppVersion}
          </Typography>
          <br />

          <ButtonFancy
            text="Download new version"
            onClick={async () => {
              setIsOpen(false);
              await onUpdateSelect();
            }}
          />
        </div>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
