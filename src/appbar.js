import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleModal from './modal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({apikey}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-controls="base-menu" aria-haspopup="true" onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
              id="base-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component="a" href="https://app.themonetizr.com/offers" target="_blank">Offer catalog</MenuItem>
              <MenuItem component="a" href="https://www.themonetizr.com/pricing" target="_blank">Pricing</MenuItem>
              <MenuItem component="a" href="https://www.themonetizr.com/demo" target="_blank">Demo</MenuItem>
              <MenuItem component="a" href="https://docs.themonetizr.com/" target="_blank">Docs</MenuItem>
              <MenuItem component="a" href="https://www.themonetizr.com/about" target="_blank">About</MenuItem>
              <MenuItem component="a" href="https://static.themonetizr.com/embed_demo/" target="_blank">Game</MenuItem>
            </Menu>

          <Typography variant="h6" className={classes.title}>
            Rewards
          </Typography>
          <SimpleModal apikey={apikey}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
