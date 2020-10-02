import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import OfferList from './offerlist';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.modal,
    border: '1px solid ' + theme.palette.background.modal,
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
    color: '#f2a535',
  },
  modal: {
      border: '1px solid ' + theme.palette.background.modal,
  }
}));


export default function SimpleModal({apikey}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Available offers</h2>
      <OfferList apikey={apikey} handleClose={handleClose}/>
    </div>
  );

  return (
      <div>
      <Button color="inherit" onClick={handleOpen}>
        Show offers
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
      </div>
  );
}
