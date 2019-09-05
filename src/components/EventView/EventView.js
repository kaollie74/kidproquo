import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import '../App/App.css';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { Table, Icon } from 'semantic-ui-react';

class EventView extends Component {

handleClaim = (event, item) => {
  console.log('in handle Claim', item);

  let newObject = {
    id : item.id,
    claimer_id : this.props.reduxStore.user.id,
    event_claimed: true,
    event_date: item.event_date
  }

  console.log('newObject', newObject)

  this.props.dispatch({type: 'CLAIM_EVENT', payload: newObject})
  
}

handleCreateRequest = () => {
  
}


  render() {
    return (
      <>
      <h1>Events </h1>
      <Button onClick={this.handleCreateRequest}>Create Request</Button>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Family</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
            <Table.HeaderCell>N/O</Table.HeaderCell>
            <Table.HeaderCell>Button</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.reduxStore.calendar.map(item =>(

            <Table.Row key={item.id}>
              <Table.Cell>{item.last_name1}</Table.Cell>
              <Table.Cell> {item.event_time_start} - {item.event_time_end} </Table.Cell>
              <Table.Cell>{item.notes}</Table.Cell>
              <Table.Cell className= {item.offer_needed ? 'orange' :'blue'} > </Table.Cell>
              <Table.Cell><Icon plus square onClick={(event) => this.handleClaim(event, item)}>Claim</Icon></Table.Cell>
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