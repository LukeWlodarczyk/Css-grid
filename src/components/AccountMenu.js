import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signOutUser, replaceUrl } from '../actions/index';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MenuButton from 'material-ui-icons/Menu';
import AccountBox from 'material-ui-icons/AccountBox';
import Settings from 'material-ui-icons/Settings';
import Power from 'material-ui-icons/PowerSettingsNew';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';

class AccountMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLink = url => () => {
    this.props.replaceUrl(url);
    this.handleClose()
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuButton />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLink("/users/"+this.props.userId)} >
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText inset primary="Profile" />
          </MenuItem>
          <MenuItem onClick={this.handleLink("/add-article")} >
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <ListItemText inset primary="Add article" />
          </MenuItem>
          <MenuItem onClick={this.handleLink("/users/"+this.props.userId+"/settings")}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText inset primary="Settings" />
          </MenuItem>
          <MenuItem onClick={this.props.signOutUser}>
            <ListItemIcon>
              <Power />
            </ListItemIcon>
            <ListItemText inset primary="Sign out" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(null, { signOutUser, replaceUrl })(AccountMenu);
