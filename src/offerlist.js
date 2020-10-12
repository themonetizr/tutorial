import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import { Redirect } from "react-router-dom";
import history from './utils/history';

const styles = theme => ({
  listRoot: {
    width: '100%',
    maxWidth: '100%',
  },
  inline: {
    display: 'inline',
    color: '#f2a535'
  },
  item: {
      backgroundColor: '#1e181e',
      marginTop: '8px',
      borderRadius: '15px',
      padding: '0px',
      cursor: 'pointer',
  },
  avatarContainer: {
      width: '33%',
      height: '100%',
      marginTop: '0px'
  },
  avatar: {
      borderRadius: 0,
      borderTopLeftRadius: '15px',
      borderBottomLeftRadius: '15px',
      width: '100%',
      height: '100%'
  },
  itemtext: {
      marginLeft: '8px'
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class OfferList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          redirect: null,
          reward_tag: null,
          value: 1
        };
    }

    componentDidMount() {
        fetch("https://api3.themonetizr.com/api/offers", {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.props.apikey}`
            }
        })
          .then(res => {
              if (!res.ok) {
                  throw new Error('Invalid API request, check access parameters');
              }
              return res.json();
          })
          .then(
            (offers) => {
                this.setState({
                    isLoaded: true,
                    items: offers.results
                });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
      );
    }

  handleChange(event, newValue) {
      if (newValue !== 1) {
          const { handleClose } = this.props;
          handleClose();
      } else {
          this.setState({value: newValue});
      }
  }

  render() {
      const { classes } = this.props;
      const { apikey } = this.props;

      if (this.state.redirect) {
          history.push('/', {apikey: apikey});
          return <Redirect to={{'pathname': this.state.redirect, state: {apikey: apikey, reward_tag: this.state.reward_tag}}} />
      }

      if (this.state.error) {
          return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.isLoaded) {
          return <div>Loading...</div>;
      } else {
          const items = this.state.items;
          return (
              <>
              <Tabs value={this.state.value} variant="fullWidth" onChange={(event, newValue) => this.handleChange(event, newValue)} aria-label="simple tabs example">
                  <Tab icon={<PersonPinIcon />} label="Friends" {...a11yProps(0)} />
                  <Tab icon={<FavoriteIcon />} label="Redeem" {...a11yProps(1)} />
                  <Tab icon={<HelpIcon />} label="Close" {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={this.state.value} index={0}>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
              </TabPanel>
              <div className="modal-offer-list">
                <List className={classes.listRoot} >
                {items.map(item => (
                    <ListItem
                        alignItems="center"
                        key={item.id}
                        className={classes.item}
                        onClick={() => {
                            this.setState({ redirect: "/reward", reward_tag: item.offer_tag});
                        }}>
                      <ListItemAvatar className={classes.avatarContainer}>
                        <Avatar alt="MT" src={item.offer_thumbnail} className={classes.avatar}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        className={classes.itemtext}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                            >

                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                ))}
                </List>
            </div>
            </>
            );
        }
    }
};

OfferList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OfferList);
