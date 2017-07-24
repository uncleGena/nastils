import React from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';




export default class SpendsAll extends React.Component {
  constructor(props) {
    super(props)

  }

  //

  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Дата</TableHeaderColumn>
            <TableHeaderColumn>Тип</TableHeaderColumn>
            <TableHeaderColumn>Назва</TableHeaderColumn>
            <TableHeaderColumn>Сума</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.spends.map(val => {
            return <TableRow key={val.id}>
              <TableRowColumn>{val.created_at}</TableRowColumn>
              <TableRowColumn>{val.type}</TableRowColumn>
              <TableRowColumn>{val.note}</TableRowColumn>
              <TableRowColumn>{val.value}</TableRowColumn>
            </TableRow>
          })}
        </TableBody>
      </Table>
    )
  }
}
