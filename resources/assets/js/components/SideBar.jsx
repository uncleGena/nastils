import React from 'react'

import Drawer from 'material-ui/Drawer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import GroupIcon from 'material-ui/svg-icons/social/group';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import BrushIcon from 'material-ui/svg-icons/image/brush';

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'



export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    // this.visibility = this.visibilityChange.bind(this);
    // this.state = {
    //   show: props.show
    // }
  }

  componentDidMount() {
    // console.log('MOUNTED. this.state.show', this.props.show);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('updaTED. nextProps:', nextProps);
  }

  some() {
    // console.log('some')
  }

  handleClose(e) {
    this.props.visibilityChange(false);
  }

  render() {
    return (
      <Drawer
        open={this.props.show}
        docked={false}
        onRequestChange={(open) => this.props.visibilityChange(open)}
        >
        <Card>

          <CardHeader
            title="User Name"
            subtitle="Subtitle"
            avatar="img/nastya.jpg"
            />
          <CardMedia
            overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
            <img src="img/nails_pic.jpg" />
          </CardMedia>
          <CardActions>
            {/*<FlatButton label="Action1" />*/}
            {/*<FlatButton label="Action2" />*/}
          </CardActions>

          <Divider />

          <NavLink to="/clients" style={{textDecoration:'none'}}>
            <MenuItem onTouchTap={this.handleClose.bind(this)}
              leftIcon={<GroupIcon />}
              >Clients
            </MenuItem>
          </NavLink>

          <NavLink to="/spends" style={{textDecoration:'none'}}>
            <MenuItem onTouchTap={this.handleClose.bind(this)}
              leftIcon={<MoneyIcon />}
              >Spends</MenuItem>
          </NavLink>

          <NavLink to="/orders" style={{textDecoration:'none'}}>
            <MenuItem onTouchTap={this.handleClose.bind(this)}
              leftIcon={<BrushIcon />}
              >Orders</MenuItem>
          </NavLink>

          <Divider />
          <MenuItem onTouchTap={this.handleClose.bind(this)}
            >
            <NavLink to="/">HOME</NavLink>

            </MenuItem>
          <Divider />

          <MenuItem onTouchTap={this.handleClose.bind(this)}
            >Services
          </MenuItem>

          <MenuItem onTouchTap={this.handleClose.bind(this)}
            >Materials
          </MenuItem>

          <MenuItem onTouchTap={this.handleClose.bind(this)}
            >Services
          </MenuItem>

        </Card>
      </Drawer>
    )
  }
}
