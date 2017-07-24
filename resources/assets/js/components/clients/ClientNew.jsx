import React from 'react'

import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import $ from 'jquery';

export default class ClientNew extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clientName: '',
      clientNote: '',
      clientSource: '',
      latestClient: {name: 'loading', note: 'loading', source: 'loading'},
    }
  }

  componentDidMount() {
    this.showLatestClient()
  }

  setName = (e, newVal) => {
    this.setState({clientName: newVal})
  }

  setNote(e, newVal) {
    this.setState({clientNote: newVal})
  }

  setSource(e, newVal) {
    this.setState({clientSource: newVal})
  }

  createNewClient(e) {
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
      // then reset
      this.setState({clientName:'', clientNote:'', clientSource:''})
      this.showLatestClient();
      // this.props.reloadClients();
      this.props.showSnackbarCreate();
    }, err => {
      console.warn('error while sending new client', err.responseText);
    });
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

  render() {
    return (
      <Row center="md">
        <Col xs={12} md={7} lg={4} style={{marginBottom:'65px', marginTop: '0px'}}>
          <Row>
            <Col xs={12} md={12}>
              <TextField
                style={{width: '100%'}}
                floatingLabelText="Client Name"
                onChange={this.setName}
                value={this.state.clientName}
              />
            </Col>
            <Col xs={12} md={12}>
              <TextField
                multiLine={true}
                rows={1}
                style={{width: '100%'}}
                floatingLabelText="Note"
                hintText="Введіть особливості клієнта"
                onChange={this.setNote.bind(this)}
                value={this.state.clientNote}
              />
            </Col>
            <Col xs={12} md={12}>
              <TextField
                style={{width: '100%'}}
                floatingLabelText="Source"
                hintText="Звідки клієнт дізнався"
                onChange={this.setSource.bind(this)}
                value={this.state.clientSource}
              />
            </Col>
            <Col xs={12} md={12}>
              <br />
              <RaisedButton label="Add" fullWidth={true}
                onTouchTap={this.createNewClient.bind(this)}/>
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
    )
  }
}
