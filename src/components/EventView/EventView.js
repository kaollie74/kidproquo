import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const styles = theme => ({
  grid: {
    width: '60%',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class EventView extends Component {

  state = {
    event_date: new Date(),
    event_time_start: new Date(),
    event_time_end: new Date(),
    open: false,
    request_id: '',
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
    this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0] });
  }

  handleDateChange = (event, propsName) => {
    console.log('this is event', event)
    this.setState({
      [propsName]: event
    });
  };

  handleClaim = (event, item) => {
    console.log('in handle Claim', item);
    let newObject = {
      id: item.id,
      claimer_id: this.props.reduxStore.user.id,
      event_claimed: true,
      event_date: item.event_date
    }

    console.log('newObject', newObject)

    this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject })
  }

  handleCreateRequest = () => {
    console.log(this.state)
    let timeStart = this.state.event_time_start.toTimeString();
    let newTimeStart = timeStart.substring(0, 5);
    let timeEnd = this.state.event_time_end.toTimeString();
    let newTimeEnd = timeEnd.substring(0, 5);
    let newDate = (this.state.event_date.getFullYear() + "-" + 0 + Number(this.state.event_date.getMonth() + 1) + "-" + this.state.event_date.getDate())
    let newEventToSend = {
      event_date: newDate,
      event_time_start: newTimeStart,
      event_time_end: newTimeEnd,
      requester_id: this.props.reduxStore.family.id,
      // group_id: this.props.reduxStore.userGroups[0].id
    }
    console.log(newDate);
    console.log(newTimeStart);
    console.log(newTimeEnd);
    console.log('THIS IS THE OBJECT TO SEND TO SAGA!!!!!!!!!', newEventToSend);
    this.props.dispatch({ type: 'ADD_REQUEST', payload: newEventToSend })
  }

  openModal = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render() {

    console.log('this is state', this.state)
    const { classes } = this.props;
    if (this.props.reduxStore.calendar.length !== 0) {
      return (
        <>
          <h1>Events </h1>
          <Button variant="contained" color="primary" onClick={this.openModal}>Create Request</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            arai-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.openModal}
          >
            <div className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Text in a modal
            </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container className={classes.grid} justify="space-around">
                    <DatePicker
                      margin="normal"
                      label="Date picker"
                      value={this.state.event_date}
                      onChange={(event) => this.handleDateChange(event, 'event_date')}
                    />
                    <TimePicker
                      margin="normal"
                      label="Time Start"
                      value={this.state.event_time_start}
                      onChange={(event) => this.handleDateChange(event, 'event_time_start')}
                    />
                    <TimePicker
                      margin="normal"
                      label="Time end"
                      value={this.state.event_time_end}
                      onChange={(event) => this.handleDateChange(event, 'event_time_end')}
                    />
                    <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}>Submit Request</Button>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Typography>
            </div>
          </Modal>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Family</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>N/O</Table.HeaderCell>
                <Table.HeaderCell>Claim</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.reduxStore.calendar.map(item => (

                <Table.Row key={item.id}>
                  <Table.Cell>{item.last_name1}</Table.Cell>
                  <Table.Cell> {item.event_time_start} - {item.event_time_end} </Table.Cell>
                  <Table.Cell>{item.notes}</Table.Cell>
                  <Table.Cell className={item.offer_needed ? 'orange' : 'blue'} > </Table.Cell>
                  <Table.Cell><Icon name="plus square" size="large" onClick={(event) => this.handleClaim(event, item)}></Icon></Table.Cell>
                </Table.Row>
              ))}


            </Table.Body>
          </Table>
        </>

      ) // return
    } else {
      return (
        <>
          <h1>No Events Scheduled</h1>
          <div>
            <Button variant="contained" color="primary" onClick={this.openModal}>Create Request</Button>
            <Modal
              aria-labelledby="simple-modal-title"
              arai-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.openModal}
            >
              <div className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                  Text in a modal
            </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container className={classes.grid} justify="space-around">
                      <DatePicker
                        margin="normal"
                        label="Date picker"
                        value={this.state.selectedDate}
                        onChange={(event) => this.handleDateChange(event, 'event_date')}
                      />
                      <TimePicker
                        margin="normal"
                        label="Time Start"
                        value={this.state.selectedTimeStart}
                        onChange={(event) => this.handleDateChange(event, 'event_time_start')}
                      />
                      <TimePicker
                        margin="normal"
                        label="Time end"
                        value={this.state.selectedTimeEnd}
                        onChange={(event) => this.handleDateChange(event, 'event_time_end')}
                      />
                      <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}>Submit Request</Button>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Typography>
              </div>
            </Modal>
          </div>
        </>
      )
    }

  } // end render


} // end EventView

const mapsToStateProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapsToStateProps)(EventView));