import React from 'react';

import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/action/delete';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import $ from 'jquery';

const PersonAdd = <FontIcon className="material-icons">person_add</FontIcon>;
const Group = <FontIcon className="material-icons">group</FontIcon>;
// const nearbyIcon = <IconLocationOn />;


export default class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
      clientName: '',
      clientNote: '',
      clientSource: '',
      snackbar: false,
      tableData: [
        {
          id: 'loading...',
          name: 'loading...',
          note: 'loading...',
          source: 'loading...'
        }
      ],
      selectedRows: [],
      latestClient: {name: 'loading', note: 'loading', source: 'loading'}
    }
  }

  getAllClients() {
    $.ajax({
      url: '/api/clients',
      method: 'GET',
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    }).then(resp => {
      console.log('MOUNTED', resp);
      this.setState({tableData: resp});
    }, err => {
      console.log('error while loading clients', err);
    });
  }

  componentDidMount() {
    this.getAllClients();
    this.showLatestClient();
  }

  showLatestClient() {
    $.ajax({
      url: 'api/clients/latest',
      method: 'GET',
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    }).then(resp => {
      console.log('LATEST CLIENT:', resp);
      this.setState({latestClient: resp});
    }, err => {
      console.warn('error while loading latest client', err);
    })
  }

  select = (index) => this.setState({selectedIndex: index});

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextState);
  }

  setName(e, newVal) {
    this.setState({clientName: newVal})
  }

  setNote(e, newVal) {
    this.setState({clientNote: newVal})
  }

  setSource(e, newVal) {
    this.setState({clientSource: newVal})
  }

  sendNewUser(e) {
    console.log(this.state);
    $.ajax({
      url: '/api/clients/',
      method: 'POST',
      data: {
        name: this.state.clientName,
        note: this.state.clientNote,
        source: this.state.clientSource
      },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    }).then(resp => {
      console.log('send new client.', resp);
      this.setState({snackbar:true})
      // then reset
      this.setState({clientName:'', clientNote:'', clientSource:''})
      this.showLatestClient();
      this.getAllClients();
    }, err => {
      console.warn('error while sending new client', err.responseText);
    });
  }

  closeSnackbar(e) {
    this.setState({snackbar:false});
  }

  onRowSelection = (rowInds) => {
    let selectedRows = this.state.tableData.filter((val, ind) => {
      let isSelected = rowInds.find(i => i === ind);
      return isSelected !== undefined;
    });
    this.setState({selectedRows});
  }

  deleteClient(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/clients/${id}`,
        method: 'DELETE',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
      }).then(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });
    })
  }

  deleteSelectedRows = () => {
    console.log(this.state.selectedRows);
    // let deletedClients = this.state.selectedRows.map(val => {
    //   this.deleteClient(val.id);
    // });
    let deletedClients = [];
    for (let row of this.state.selectedRows) {
      deletedClients.push(this.deleteClient(row.id));
    }
    Promise.all(deletedClients).then(values => {
      this.getAllClients();
      this.showLatestClient();
      console.log('selected clients deleted', values);
    })
  }

  render() {
    let newClientForm;
    if (this.state.selectedIndex === 0) {
      newClientForm = <Row center="md">
        <Col xs={12} md={7} lg={4} style={{marginBottom:'100px', marginTop: '100px'}}>
          <Row>
            <Col xs={12} md={12}>
              <TextField
                style={{width: '100%'}}
                hintText="Client Name"
                onChange={this.setName.bind(this)}
                value={this.state.clientName}
                />
            </Col>
            <Col xs={12} md={12}>
              <TextField
                style={{width: '100%'}}
                hintText="Note"
                onChange={this.setNote.bind(this)}
                value={this.state.clientNote}
                />
            </Col>
            <Col xs={12} md={12}>
              <TextField
                style={{width: '100%'}}
                hintText="Source"
                onChange={this.setSource.bind(this)}
                value={this.state.clientSource}
                />
            </Col>
            <Col xs={12} md={12}>
              <br />
              <RaisedButton label="Add" fullWidth={true}
                onTouchTap={this.sendNewUser.bind(this)}/>
            </Col>
            <Divider />
            <Col xs={12} md={12} style={{marginTop: '35px'}}>
              <List>
                <Subheader style={{fontSize: '1em', fontFamily: 'Roboto, sans-serif'}}>
                  Останній клієнт
                </Subheader>
                <ListItem
                  primaryText={this.state.latestClient.name}
                  secondaryText={this.state.latestClient.note}
                />
              </List>
            </Col>
          </Row>
        </Col>
      </Row>
    }
    let clientsTable;
    if (this.state.selectedIndex === 1) {
      clientsTable = <Table
        onRowSelection={this.onRowSelection}
        selectable={true}
        multiSelectable={true}>
        <TableHeader
          enableSelectAll={true}
          displaySelectAll={true}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Note</TableHeaderColumn>
            <TableHeaderColumn>Source</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows={true}
          deselectOnClickaway={true}>
          {this.state.tableData.map(row => (
            <TableRow key={row.id}>
              <TableRowColumn>{row.id}</TableRowColumn>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.note}</TableRowColumn>
              <TableRowColumn>{row.source}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    }

    let floattingButton = {
      position: 'fixed',
      bottom: '6rem',
      right: '2rem',
      zIndex: '2'
    }

    return (
      <div>


        {newClientForm}
        {clientsTable}

        <FloatingActionButton style={floattingButton} onTouchTap={this.deleteSelectedRows}>
          <ContentAdd />
        </FloatingActionButton>

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
          open={this.state.snackbar}
          message="Успішно додано нового клієнта"
          autoHideDuration={5000}
          onRequestClose={this.closeSnackbar.bind(this)}
          />
      </div>
    )
  }

}
