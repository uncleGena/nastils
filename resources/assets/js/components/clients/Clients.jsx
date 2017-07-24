import React from 'react';

import TextField from 'material-ui/TextField';
// import {Grid, Row, Col} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
// import Divider from 'material-ui/Divider';
// import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/action/delete';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import ClientNew from './ClientNew'
import ClientsAll from './ClientsAll'

import $ from 'jquery';

const PersonAdd = <FontIcon className="material-icons">person_add</FontIcon>;
const Group = <FontIcon className="material-icons">group</FontIcon>;
// const nearbyIcon = <IconLocationOn />;


export default class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      snackbarAdd: false,
      snackbarUpdate: false,
      snackbarDelete: false
    }
  }

  componentDidMount() {
    // this.getAllClients();
    // this.showLatestClient();
  }

  select = (index) => this.setState({selectedIndex: index});

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextState);
  }

  closeSnackbar(e) {
    this.setState({snackbarAdd:false});
    this.setState({snackbarUpdate:false});
    this.setState({snackbarDelete:false});
  }

  render() {

    return (
      <div>


        {this.state.selectedIndex === 0 &&
          <ClientNew
            showSnackbarCreate={() => { this.setState({snackbarAdd:true}) }}
          />
        }

        {this.state.selectedIndex === 1 &&
          <ClientsAll
            showSnackbarUpdate={() => { this.setState({snackbarUpdate:true}) }}
            showSnackbarDelete={() => { this.setState({snackbarDelete:true}) }}
          />
        }

        {/*BottomNavigation*/}
        <Paper zDepth={1} style={{position:'fixed', bottom:'.5rem', right:'.5rem', left:'.5rem', zIndex:'2'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Add New"
              icon={PersonAdd}
              onTouchTap={() => this.select(0)}
              />
            <BottomNavigationItem
              label="Clients"
              icon={Group}
              onTouchTap={() => this.select(1)}
              />
          </BottomNavigation>
        </Paper>

        <Snackbar
          open={this.state.snackbarAdd}
          message="Успішно додано нового клієнта"
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar.bind(this)}
        />

        <Snackbar
          open={this.state.snackbarUpdate}
          message="Успішно оновлено клієнта"
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar.bind(this)}
        />

        <Snackbar
          open={this.state.snackbarDelete}
          message="Успішно видалено клієнта"
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar.bind(this)}
        />
      </div>
    )
  }

}
