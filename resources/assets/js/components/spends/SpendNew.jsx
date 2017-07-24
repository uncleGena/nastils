import React from 'react'


import {Grid, Row, Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import $ from 'jquery';

export default class SpendNew extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
    // this.latestSpends()
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
      // this.latestSpends()
      this.props.reloadSpends()
      console.log('created spend', resp);
    }, err => {
      this.setState({error: err.responseText})
      console.warn('error create spend', err);
    })
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

  render() {
    return (
      <div>
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
    )
  }
}
