import React from 'react';

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import SideBar from './SideBar'


export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {open: false};
  }

  buttonClick(e) {
    console.log('buttonClick.....', e)
  }

  handleToggle = () => {
    console.log('handleToggle.....', this.state.open);
    return this.setState({open: !this.state.open});
  }

  handleSideBarTogle(status) {
    this.setState({open:status});
  }

  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Send feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
          onLeftIconButtonTouchTap={this.handleToggle}
          onRightIconButtonTouchTap={this.buttonClick}
          />
        <SideBar
          show={this.state.open}
          visibilityChange={this.handleSideBarTogle.bind(this)}
          />
      </div>
    )
  }

}
