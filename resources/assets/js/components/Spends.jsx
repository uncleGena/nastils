import React from 'react';

import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import $ from 'jquery';


const MoneyOff = <FontIcon className="material-icons">money_off</FontIcon>;
const MergeType = <FontIcon className="material-icons">merge_type</FontIcon>;

export default class Spends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      selectedIndex: 2,
      spendTypes: [], // types for select field.
      selectedType: null, // selected type in types field.
      spendName: null, // name of spend.
      sumValue: 33, // spend sum.
      errorSumText: '', // error message, default is empty.
      buttonDisabled: false, // status of add button.
      spends: [] // here is some spends to show.
    }
  }

  componentWillMount() {
    this.checkButtonDisabled()
    this.latestSpends()
    $.get('api/spend-types').then(resp => {
      // console.log(resp);
      this.setState({spendTypes:resp})
    }, err => {
      console.warn(err);
    })
  }

  handleChangeType = (event, index, value) => this.setState({selectedType:value}, () => {
    this.checkButtonDisabled()
  })

  select = (index) => this.setState({selectedIndex: index});

  changeSpend = ev => this.setState({spendName:ev.target.value}, () => {
    this.checkButtonDisabled()
  })
  changeSumm = ev => {
    let sum = ev.target.value
    if (typeof Number(sum) == 'number' && !isNaN(Number(sum))) {
      this.setState({errorSumText: ''}, () => {
        this.checkButtonDisabled()
      })
    } else {
      this.setState({errorSumText: 'Введи число'}, () => {
        this.checkButtonDisabled()
      })
    }
    this.setState({sumValue: Number(sum)}, () => {
      this.checkButtonDisabled()
    }) // set anyway, will check on sending stage.
  }

  // check if button which send spend is enabled or disabled.
  checkButtonDisabled = () => {
    // console.log(this.state);
    let sum = this.state.sumValue
    if (
      this.state.selectedType != null && // check type of spend.
      this.state.spendName != null && // check spend name.
      typeof Number(sum) == 'number' && !isNaN(Number(sum)) // check spend sum.
    ) {
      console.log('button enabled.', this.state.selectedType, this.state.spendName, this.state.sumValue);
      this.setState({buttonDisabled:false})
    } else {
      console.log('button disabled.', this.state.selectedType, this.state.spendName, this.state.sumValue);
      this.setState({buttonDisabled:true})
    }
  }

  addSpend = ev => {
    $.ajax({
      url: 'api/spends',
      type: 'POST',
      data: {
        spend_type_id: this.state.selectedType,
        note: this.state.spendName,
        value: this.state.sumValue
      },
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    }).then(resp => {
      console.log('created spend', resp);
    }, err => {
      this.setState({error: err.responseText})
      console.warn('error create spend', err);
    })
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

  render() {
    let newSpend;
    if (this.state.selectedIndex === 0) {
      newSpend = <div>
        <Row center="md">
          <Col xs={12} md={7} lg={4} style={{marginBottom:'50px', marginTop: '20px'}}>
            <Row>
              <Col xs={12} md={12} style={{textAlign: 'left'}}>
                <SelectField
                  style={{width: '100%'}}
                  floatingLabelText="Frequency"
                  value={this.state.selectedType}
                  onChange={this.handleChangeType} >
                  {this.state.spendTypes.map(obj => {
                    return <MenuItem
                      value={obj.id}
                      primaryText={obj.type+' - '+obj.group}
                      key={obj.id}
                    />
                  })}
                </SelectField>
                <TextField
                  style={{width: '100%'}}
                  floatingLabelText="Що закупили"
                  defaultValue={this.state.spendName}
                  onChange={this.changeSpend}
                />
                <TextField
                  style={{width: '100%'}}
                  floatingLabelText="Сума"
                  defaultValue={this.state.sumValue}
                  onChange={this.changeSumm}
                  errorText={this.state.errorSumText}
                />
                <RaisedButton
                  label="Внести новую затрату"
                  fullWidth={true}
                  onTouchTap={this.addSpend}
                  disabled={this.state.buttonDisabled}
                  primary={true}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    }

    let spendTypes;
    if (this.state.selectedIndex === 1) {
      spendTypes = <div>SPEND TYPES</div>
    }

    let spends;
    if (this.state.selectedIndex === 2) {
      spends = <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Дата</TableHeaderColumn>
            <TableHeaderColumn>Тип</TableHeaderColumn>
            <TableHeaderColumn>Назва</TableHeaderColumn>
            <TableHeaderColumn>Сума</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.spends.map(val => {
            return <TableRow key={val.id}>
              <TableRowColumn>{val.created_at}</TableRowColumn>
              <TableRowColumn>{val.type}</TableRowColumn>
              <TableRowColumn>{val.note}</TableRowColumn>
              <TableRowColumn>{val.value}</TableRowColumn>
            </TableRow>
          })}
        </TableBody>
      </Table>
    }

    return (
      <div>

        <h2>Spends</h2>

        <div dangerouslySetInnerHTML={{__html: this.state.error}} />

        {newSpend}
        {spendTypes}
        {spends}



        <Paper zDepth={1} style={{position:'fixed', bottom:'.5rem', right:'.5rem', left:'.5rem', zIndex:'2'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Новая трата"
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
