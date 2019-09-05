import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'

import { Table, Icon } from 'semantic-ui-react';

class EventView extends Component {
  render() {
    return (
      <>
      <h1>Events </h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.reduxStore.calendar.map(item =>(
            <Table.Row key={item.id}>
              <Table.Cell>{item.claimer_id}</Table.Cell>
              <Table.Cell> {item.event_confirmed ? 'unconfirmed': <Icon name='checkmark'>confirmed</Icon>}</Table.Cell>
              <Table.Cell> Sitting:{item.event_time_start} - {item.event_time_end} </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </>

    )
  }

}

const mapsToStateProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapsToStateProps)(EventView);