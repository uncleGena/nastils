import React from 'react'

import Drawer from 'material-ui/Drawer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import GroupIcon from 'material-ui/svg-icons/social/group';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import BrushIcon from 'material-ui/svg-icons/image/brush';


export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    // this.visibility = this.visibilityChange.bind(this);
    // this.state = {
    //   show: props.show
    // }
  }

  componentDidMount() {
    console.log('MOUNTED. this.state.show', this.props.show);
  }

  componentWillReceiveProps(nextProps) {
    console.log('updaTED. nextProps:', nextProps);
  }

  some() {
    console.log('some')
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
          {/*<CardTitle title="Card title" subtitle="Card subtitle" />*/}
          {/*<CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>*/}
          <CardActions>
            {/*<FlatButton label="Action1" />*/}
            {/*<FlatButton label="Action2" />*/}
          </CardActions>

          <Divider />

          <MenuItem onTouchTap={this.handleClose.bind(this)}
            leftIcon={<GroupIcon />}
            >Klients</MenuItem>

          <MenuItem onTouchTap={this.handleClose.bind(this)}
            leftIcon={<MoneyIcon />}
            >Spends</MenuItem>

          <MenuItem onTouchTap={this.handleClose.bind(this)}
            leftIcon={<BrushIcon />}
            >Orders</MenuItem>

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
