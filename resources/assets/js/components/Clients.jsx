import React from 'react';

import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';


const PersonAdd = <FontIcon className="material-icons">person_add</FontIcon>;
const Group = <FontIcon className="material-icons">group</FontIcon>;
// const nearbyIcon = <IconLocationOn />;


export default class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      clientName: '',
      clientNote: '',
      snackbar: false
    }
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
  sendNewUser(e) {
    console.log(this.state);
    // then reset
    this.setState({clientName:'', clientNote:''}, () => {

      console.log(this.state);
      this.setState({snackbar:true})
    })
  }
  closeSnackbar(e) {
    this.setState({snackbar:false});
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
              <br />
              <RaisedButton label="Add" fullWidth={true}
                onTouchTap={this.sendNewUser.bind(this)}/>
            </Col>
          </Row>
        </Col>
      </Row>
    }
    let clientsTable;
    if (this.state.selectedIndex === 1) {
      clientsTable = <table><tbody><tr><td>table</td></tr></tbody></table>
    }
    return (
      <div>

        {newClientForm}
        {clientsTable}
          {/*<Row center="md">
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
                  <br />
                  <RaisedButton label="Add" fullWidth={true}
                    onTouchTap={this.sendNewUser.bind(this)}/>
                </Col>
              </Row>
            </Col>
          </Row>*/}


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
          message="Event added to your calendar"
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar.bind(this)}
          />
      </div>
    )
  }

}
