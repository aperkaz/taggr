import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import ButtonFancy from './ButtonFancy';
import Typography from '../atoms/Typography';
import ButtonRegular from '../molecules/ButtonRegular';

const FooterDivider = styled.div`
  margin: auto auto 1rem;

  height: 4px;
  width: 80%;

  background: linear-gradient(70.98deg, #ff96ad 9.38%, #feaf85 91.67%);
  border-radius: 4px;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    marginBottom: '2rem',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  }
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectSupport: () => void;
  onCheckIfSupporter: (email: string) => void;
};

const SupportModal = ({
  isOpen = false,
  onClose = () => null,
  onSelectSupport = () => null,
  onCheckIfSupporter = () => null
}: Props) => {
  const classes = useStyles();

  const [emailInput, setEmailInput] = useState('');

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Typography variant="h4" style={{ marginBottom: '2rem' }}>
            Fund further development!
          </Typography>
          <ButtonFancy
            text="Become a supporter"
            onClick={onSelectSupport}
            style={{ marginBottom: '2rem', width: '300px' }}
          />
          <br />
          <FooterDivider style={{ marginBottom: '2rem', width: '60px' }} />
          <Typography variant="subtitle1" style={{ marginBottom: '1rem' }}>
            Already a supporter?
          </Typography>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <TextField
              id="outlined-basic"
              label="purchase email"
              variant="outlined"
              fullWidth={true}
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
            />
            <br />
            <ButtonRegular
              text="🔍 Check"
              onClick={() => onCheckIfSupporter(emailInput)}
              style={{
                marginTop: '.5rem',
                background:
                  emailInput.length < 3 ? 'grey' : `rgb(49, 153, 255)`,
                width: '300px'
              }}
              args={emailInput.length < 3 ? { disabled: true } : {}}
            />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SupportModal;
