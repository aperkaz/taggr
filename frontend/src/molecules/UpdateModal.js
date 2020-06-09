import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import semverCompare from "semver/functions/compare";
import FancyButton from "./FancyButton";

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
      console.log("invalid semver");
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
          <h2 id="transition-modal-title">Update available</h2>
          <p id="transition-modal-description">
            Current app version: {currentAppVersion}
            <br />
            New app version: {latestAppVersion}
          </p>
          <FancyButton
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
