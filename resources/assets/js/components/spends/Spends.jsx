import React from 'react';

import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
// import Snackbar from 'material-ui/Snackbar';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import {Grid, Row, Col} from 'react-flexbox-grid';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';

// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';

import $ from 'jquery';


import SpendNew from './SpendNew'
import SpendTypes from './SpendTypes'
import SpendsAll from './SpendsAll'


const MoneyOff = <FontIcon className="material-icons">money_off</FontIcon>;
const MergeType = <FontIcon className="material-icons">merge_type</FontIcon>;

export default class Spends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      selectedIndex: 0,
      spends: [] // here is some spends to show.
    }
  }

  componentWillMount() {
    this.latestSpends()
  }

  latestSpends = () => {
    $.ajax({
      url: 'api/spends',
      type: 'GET',
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    }).then(resp => {
      this.setState({spends:resp})
      console.log('all spends', resp);
    }, err => {
      this.setState({error: err.responseText})
    })
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {

    return (
      <div>

        <h2>Spends</h2>

        <div dangerouslySetInnerHTML={{__html: this.state.error}} />

        {this.state.selectedIndex === 0 &&
          <SpendNew reloadSpends={() => this.latestSpends()}/>
        }

        {this.state.selectedIndex === 1 &&
          <SpendTypes />
        }

        {this.state.selectedIndex === 2 &&
          <SpendsAll spends={this.state.spends}/>
        }




        <Paper zDepth={1} style={{position:'fixed', bottom:'.5rem', right:'.5rem', left:'.5rem', zIndex:'2'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Новая"
              icon={MoneyOff}
              onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Типі затрат"
              icon={MergeType}
              onTouchTap={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Всі затрати"
              icon={MergeType}
              onTouchTap={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>

      </div>
    )
  }

}
