import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
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
      cursor: 'pointer'
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

class OfferList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          redirect: null,
          reward_tag: null
        };
    }

    componentDidMount() {
        fetch("https://api3.themonetizr.com/api/products", {
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
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
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

  render() {
      const { classes } = this.props;
      const { apikey } = this.props;

      if (this.state.redirect) {
          history.push('/');
          return <Redirect to={{'pathname': this.state.redirect, state: {apikey: apikey, reward_tag: this.state.reward_tag}}} />
      }

      if (this.state.error) {
          return <div>Error: {this.state.error.message}</div>;
      } else if (!this.state.isLoaded) {
          return <div>Loading...</div>;
      } else {
          const items = this.state.items;
          return (
              <div className="modal-offer-list">
                <List className={classes.listRoot} >
                {items.map(item => (
                    <ListItem
                        alignItems="center"
                        key={item.product_tag}
                        className={classes.item}
                        onClick={() => {
                            this.setState({ redirect: "/reward", reward_tag: item.product_tag});
                        }}>
                      <ListItemAvatar className={classes.avatarContainer}>
                        <Avatar alt="MT" src={item.product_thumbnail} className={classes.avatar}/>
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
            );
        }
    }
};

OfferList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(OfferList);
