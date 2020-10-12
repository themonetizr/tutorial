import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
    width: '30vw',
    backgroundColor: theme.palette.background.modal,
    border: '1px solid ' + theme.palette.background.modal,
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
    color: '#f2a535',
    [theme.breakpoints.up('xs')]: {
      width: '100vw',
    },
    [theme.breakpoints.up('sm')]: {
      width: '60vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
    },
  },
  modal: {
      border: '1px solid ' + theme.palette.background.modal,
  }
}));


export default function RewardModal({open, onClose}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const apikey = '0EC739B6CA9AC49961216F280FB8BE7MHASGGYWER';
  const rewardTag = 'short_sleeve_test_4';

  const body = (
    <div id="shop-embed" style={modalStyle} className={classes.paper}>
	   <iframe title="Reward unity modal" style={{display: 'block', width: '100%', height: '90vh'}} id="webgl_modal_frame"
	src={`https://static.themonetizr.com/shop_embed/?token=${apikey}&name=${rewardTag}`} frameBorder="0"></iframe>
    </div>
  );


  return (
          <div>
          <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="reward-modal-title"
            className={classes.modal}
          >
            {body}
          </Modal>
          </div>
      );
}
