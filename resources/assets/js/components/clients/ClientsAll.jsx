import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/action/delete';


import $ from 'jquery';

export default class ClientsAll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [
        {
          id: 'loading...',
          name: 'loading...',
          note: 'loading...',
          source: 'loading...'
        }
      ],
      selectedRows: [],
      updatedClient: {
        id: null,
        name: null,
        note: null,
        source: null
      },
      error: null
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
    this.getAllClients()
  }

  onRowSelection = (rowInds) => {
    let selectedRows = this.state.tableData.filter((val, ind) => {
      let isSelected = rowInds.find(i => i === ind);
      return isSelected !== undefined;
    });
    this.setState({selectedRows});
  }

  clientOnChange(fieldName, event) {
    let newUpdate = this.state.updatedClient
    newUpdate.id = this.state.selectedRows[0].id
    newUpdate[fieldName] = event.target.value
    this.setState({updatedClient: newUpdate}, () => {
      console.log(this.state.updatedClient);
    })
  }

  // updateName(val) {
  //   this.setState({updatedClient: })
  // }

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
      // this.showLatestClient();
      this.props.showSnackbarDelete()
      this.setState({selectedRows:[]})
      // this.setState({updatedClient: {id:null, name:null, note:null, source:null}})
      console.log('selected clients deleted', values);
    })
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

  saveUpdatedClient = (e) => {
    let data = this.state.updatedClient;
    for (let prop in data) {
      // if value did not changed - set old value.
      if (data[prop] == null) data[prop] = this.state.selectedRows[0][prop]
    }
    $.ajax({
      url: `/api/clients/${data.id}`,
      method: 'PUT',
      data: data,
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    }).then(resp => {
      console.log('client updated', resp);
      this.getAllClients();
      this.props.showSnackbarUpdate();
    }, err => {
      setState({error: err})
      console.log(err.responseText);
    })
  }

  render() {

    let floattingButton = {
      position: 'fixed',
      bottom: '6rem',
      right: '2rem',
      zIndex: '2'
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.error}} />
        <Table
          onRowSelection={this.onRowSelection}
          selectable={true}
          multiSelectable={true}>
          <TableHeader
            enableSelectAll={true}
            displaySelectAll={true}>
            <TableRow>
              {/* <TableHeaderColumn>ID</TableHeaderColumn> */}
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Note</TableHeaderColumn>
              {/* <TableHeaderColumn>Source</TableHeaderColumn> */}
            </TableRow>
          </TableHeader>
          <TableBody
            stripedRows={true}
            deselectOnClickaway={false}>
            {this.state.tableData.map(row => (
              <TableRow key={row.id}>
                {/* <TableRowColumn>{row.id}</TableRowColumn> */}
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.note}</TableRowColumn>
                {/* <TableRowColumn>{row.source}</TableRowColumn> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {this.state.selectedRows.length == 1 &&
          <div>
            <TextField
              style={{width: '100%'}}
              hintText="Client Name"
              floatingLabelText="Client Name"
              defaultValue={this.state.selectedRows[0].name}
              onChange={this.clientOnChange.bind(this, 'name')}
            /><br />
            <TextField
              style={{width: '100%'}}
              hintText="Особливості клієнта"
              floatingLabelText="Особливості клієнта"
              multiLine={true}
              rows={1}
              rowsMax={4}
              defaultValue={this.state.selectedRows[0].note}
              onChange={this.clientOnChange.bind(this, 'note')}
            /><br />
            <TextField
              style={{width: '100%'}}
              hintText="Звідки прийшов"
              floatingLabelText="Звідки"
              multiLine={false}
              rows={1}
              defaultValue={this.state.selectedRows[0].source}
              onChange={this.clientOnChange.bind(this, 'source')}
            /><br />
            <br />
            <RaisedButton
              label="Обновить" fullWidth={true}
              onTouchTap={this.saveUpdatedClient}
              style={{marginBottom:'70px'}}
            />
          </div>
        }

        <FloatingActionButton style={floattingButton} onTouchTap={this.deleteSelectedRows}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
