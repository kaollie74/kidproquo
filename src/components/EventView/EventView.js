import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import '../App/App.css';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import yellow from '@material-ui/core/colors/yellow';
import { Link } from 'react-router-dom';
import { Iconbutton } from 'semantic-ui-react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Swal from 'sweetalert2';
import './EventView.css'


import { Table, Icon, Button, Card } from 'semantic-ui-react';
import { getThemeProps } from '@material-ui/styles';

const offeringColor = yellow['500'];

const styles = theme => ({
  grid: {
    width: '60%',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingLeft: '90px',
    outline: 'none',
    margin: '140px 14px',

  },
  textField: {
    margin: '0px 0px 10px 0px',
    maxWidth: '400px'
  },
  radio: {
    color: '#033076',
    fontWeight: '900',
    display: 'inline-block',
    padding: '0px',
    width: '250px',
    height: '50px',
    backgroundColor: 'white'
  },
  date: {
    marginLeft: '14.5vh',
    paddingBottom: '2vh'
  },
  openRequests: {
    textAlign: 'center'
  },
  button: {
    textAlign: 'center',
    margin: '20px 113px 0px 113px'
  },
  eventsRows: {
    maxWidth: '186px',
  },
  eventsBody: {
    maxWidth: '186px',
    display: 'inline-block'
  },
  card: {
    color: 'blue'
  },
  hr: {
    backgroundColor: '#8298ca',
    borderRadius: '5px',
    height: '5px',
    border: 'none',
  },
  claimButton: {
    borderRadius: '3px',
    width: '10px'
  },
  fab: {
    borderRadius: '5px'
  },
  add: {
    backgroundColor: '#89E894',
    borderRadius: '3px',
    paddingTop: '-30px'
  },
  addButton: {
    fontWeight: 'bold'
  },
  offering_needed: {
    textAlign: 'center',
    marginLeft: '20px'
  },
  cards: {
    width: '375px'
  }
});

class EventView extends Component {

  state = {
    event_date: new Date(),
    event_time_start: new Date(),
    event_time_end: new Date(),
    open: false,
    request_id: '',
    notes: '',
    offer_needed: true,
    claimer_notes: '',
    claimer_id: '',
  };

  componentDidMount() {
    console.log('DATE TO SEND TO SAGA (EVENT VIEW):', this.props.dateToSendToSaga)
    this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
    this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0] });
    // this.props.dispatch({ type: 'FETCH_EVENTS', payload: this.props.dateToSendToSaga })
    this.setState({
      event_date: new Date()
    })
    // for (let i=0; i < this.props.reduxStore.calendar.length; i++) {
    //  console.log('IN COMP DID MOUNT (EVENT VIEW) WITH:', this.props.reduxStore.calendar)
    // }

  }

  handleDateChange = (event, propsName) => {
    console.log('this is event', event)
    this.setState({
      [propsName]: event
    });
    console.log('IN HANDLE DATE CHANGE WITH:', this.state)
  };

  handleChange = (event, propertyToChange) => {
    this.setState({
      ...this.state,
      [propertyToChange]: event.target.value
    })
  }

  handleRequestStatus = (event) => {
    this.setState({
      offer_needed: event.target.value
    })
  }
  handleClaim = (event, item) => {
    console.log('in handle Claim', item)
    let inputValue = this.state.claimer_notes;
    Swal.fire({
      title: 'Are you sure you want to claim this request?',
      type: 'question',
      html:
        '<input style="width: 300px; outline: none; border: solid #c9dae1 2px; border-radius: 3px; padding: 5px;" placeholder="Add Notes (optional)" id="swal-input1">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, claim it!'
    }).then((response) => {
      if (response.value) {
        this.setState({
          claimer_notes: document.getElementById('swal-input1').value
        })
        let newObject = {
          id: item.id,
          claimer_id: this.props.reduxStore.family.id,
          event_claimed: true,
          event_date: item.event_date,
          event_time_start: item.event_time_start,
          event_time_end: item.event_time_end,
          last_name1: item.last_name1,
          claimer_notes: this.state.claimer_notes,
        }
        this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject })
        //creating text to send
        let textMessage = {
          requester_phone: item.requester_number,
          claimer_name: this.props.reduxStore.family.last_name1,
          event_date: item.event_date,
          event_time_start: item.event_time_start,
          event_time_end: item.event_time_end,
        }
        console.log('this is the text message object from event view', textMessage)
        //Twilio
        this.props.dispatch({ type: 'SEND_TEXT', payload: textMessage });
      } else if (response.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled Claim'
        )
      }
    })
  }

  timeStringToFloat = (time) => {
    let hoursMinutes = time.split(/[.:]/);
    let hours = parseInt(hoursMinutes[0], 10);
    let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    let newTime = (hours + minutes / 60);
    return newTime;
  }



  handleCreateRequest = () => {
    console.log(this.state)
    let timeStart = this.state.event_time_start.toTimeString();
    let newTimeStart = timeStart.substring(0, 5);
    let timeEnd = this.state.event_time_end.toTimeString();
    let newTimeEnd = timeEnd.substring(0, 5);
    let newDate = (this.state.event_date.getFullYear() + "-" + 0 + Number(this.state.event_date.getMonth() + 1) + "-" + this.state.event_date.getDate())
    let notes = this.state.notes;
    let offer_needed = this.state.offer_needed;
    // let hours = Number(newTimeEnd - newTimeStart);
    let startHours = this.timeStringToFloat(newTimeStart);
    let endHours = this.timeStringToFloat(newTimeEnd);
    let newStartHours = startHours.toFixed(1);
    let newEndHours = endHours.toFixed(1);
    let old_total_hours = (newEndHours - newStartHours);
    let calculated_total_hours = old_total_hours.toFixed(1);
    let total_hours = Number(calculated_total_hours * 60).toFixed(0);
    let newEventToSend = {
      event_date: newDate,
      event_time_start: newTimeStart,
      event_time_end: newTimeEnd,
      requester_id: this.props.reduxStore.family.id,
      group_id: this.props.reduxStore.userGroups[0].id,
      notes: notes,
      offer_needed: offer_needed,
      total_hours: total_hours
    }
    console.log(newDate);
    console.log(newTimeStart);
    console.log(newTimeEnd);
    console.log('THIS IS THE OBJECT TO SEND TO SAGA!!!!!!!!!', newEventToSend);
    Swal.fire({
      title: 'Are you sure you want to create this request?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!'
    }).then((result) => {
      if (result.value) {
        this.props.dispatch({ type: 'ADD_REQUEST', payload: newEventToSend })
        // this.props.dispatch({ type: 'FETCH_EVENTS', payload: newEventToSend.event_date})
        this.setState({
          event_date: new Date(),
          event_time_start: new Date(),
          event_time_end: new Date(),
          notes: '',
        })
      }
    })

    this.openModal();

    this.confirmRequest();
  }

  confirmRequest = () => {
    this.props.history.push('/calendar');
    console.log('IN CONFIRM REQUEST WITH')
  }

  deleteHandleClaim = (event, item) => {
    console.log('this is item', item)
    this.props.dispatch({ type: 'REMOVE_EVENT', payload: item })
  }

  openModal = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleSubmit = (event) => {
    this.setState({
      event_date: this.state.event_date
    })
  }

  handleCancel = () => {
    this.setState({
      event_date: new Date(),
      event_time_start: new Date(),
      event_time_end: new Date(),
      notes: ''
    })
    this.openModal();
  }

  render() {
    console.log('FAMILY REDUCER IN EVENT VIEW:', this.props.reduxStore.family)
    console.log('this is state', this.state)
    console.log('THIS IS THIS.PROPS.DATE:', this.props.date)
    const { classes } = this.props;
    if (this.props.reduxStore.calendar.length !== 0) {
      return (
        <>
          <div className='createRequestBtn'>
            <Button
              // className={classes.button} 
              variant="contained" color="primary" onClick={this.openModal}

            >
              CREATE REQUEST
            </Button>
          </div>
          <h2 className={classes.date}> {this.props.date}</h2>
          <hr className={classes.hr} />
          <h3 className={classes.openRequests}> Open Requests </h3>
          <Modal
            aria-labelledby="simple-modal-title"
            arai-describedby="simple-modal-description"
            open={this.state.open}
          //onClose={this.openModal}
          >
            <div className="timeAndDatePicker">
              <Typography style={{ marginLeft: '5px', marginTop: '30px' }} variant="h6" id="modal-title">
                Select Time/Date
            </Typography>
              <Grid container className={classes.grid} justify="space-around">
                {/* <Typography variant="subtitle1" id="simple-modal-description"> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    onSubmit={(event) => this.handleSubmit}
                  />
                  <TextField multiline
                    rowsMax="6"
                    onChange={event => this.handleChange(event, 'notes')} label="Notes"
                    value={this.state.notes}
                  ></TextField>
                  <form className={classes.radio}>
                    Offer
                      <Radio
                      label="Offer"
                      labelPlacement="top"
                      checked={this.state.offer_needed === 'true'}
                      onChange={this.handleRequestStatus}
                      value='true'
                      color="primary"
                      name="radio-button-demo"
                      aria-label='offer'
                    />
                    Need
                      <Radio
                      label="Need"
                      labelPlacement="top"
                      checked={this.state.offer_needed === 'false'}
                      onChange={this.handleRequestStatus}
                      value='false'
                      color="primary"
                      name="radio-button-demo"
                      aria-label='needed'
                    />
                  </form>
                </MuiPickersUtilsProvider>
                <Link to='/calendar'>
                  <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}
                    style={{ width: '140px', margin: '5px 0px 0px 0px' }}
                  >SUBMIT</Button>
                </Link>
                <Button variant="contained" color="red" onClick={this.handleCancel} style={{ width: '140px', margin: '5px 0px 30px 0px' }}> CANCEL </Button>

                {/* </Typography> */}
              </Grid>
            </div>
          </Modal>
          <div className={classes.cards}>
            <Card.Group
              itemsPerRow={2}
              style={{ margin: '15px' }}
            >
              {/* <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Family</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell>N/O</Table.HeaderCell>
                <Table.HeaderCell>Claim</Table.HeaderCell>
              </Table.Row>
            </Table.Header> */}


              {this.props.reduxStore.calendar.map(item => (
                <Card
                  className="ui centered cards"
                  raised key={item.id}>
                  <Card.Content>
                    <Card.Header>{item.last_name1} </Card.Header>
                    <Card.Meta>{item.event_time_start} - {item.event_time_end}</Card.Meta>
                    <Card.Description>{item.notes}</Card.Description>
                    <Card.Description className={item.offer_needed ? "ui yellow label" : "ui orange label"}
                      style={{ width: '110px' }}>
                      <p
                        // className={classes.offering_needed}
                        style={{ marginLeft: '20px', marginRight: '20px', color: 'black', fontWeight: '600' }}
                      >
                        {item.offer_needed ? 'Offering' : 'Needed'}</p>
                    </Card.Description>
                    {/* <div className={classes.claimRequestButton}>
                  <Button className={classes.claimRequestButton} color="green"  onClick={(event) => this.handleClaim(event, item)}>
                  <Icon floated="right" name="plus circle" size="large" basic color="white"></Icon>
                  </Button>
                  </div> */}
                    {/* <Button className={classes.claimButton} positive icon="plus circle">
                  </Button> */}
                    <br />
                    {item.requester_id === this.props.reduxStore.family.id
                      ?
                      <Button
                        style={{ fontWeight: 'bold', margin: '5px 0px', width: '110px', height: '37px', border: 'solid red 2px', borderRadius: '3px', backgroundColor: 'red', paddingTop: '-30px' }}
                        onClick={(event) => this.deleteHandleClaim(event, item)}
                      >
                        Delete
                      </Button>
                      :
                      <Button onClick={(event) => this.handleClaim(event, item)}
                        // className={classes.addButton}
                        style={{ fontWeight: 'bold', margin: '5px 0px', width: '110px', height: '37px', border: 'solid green 2px', borderRadius: '3px', backgroundColor: '#89E894', paddingTop: '-30px' }}
                      >
                        CLAIM +
                      </Button>
                    }

                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        </>

      ) // return
    } else {
      return (
        <>
          <div>
            <div className='createRequestBtn'>
              <Button className={classes.button} variant="contained" color="primary" onClick={this.openModal}
              >
                CREATE REQUEST
            </Button>
            </div>
            <h2 className={classes.date}> {this.props.date}</h2>
            <hr className={classes.hr} />
            <h3 className={classes.openRequests}> No Requests </h3>
            <Modal
              aria-labelledby="simple-modal-title"
              arai-describedby="simple-modal-description"
              open={this.state.open}
            //onClose={this.openModal}
            >
              <div className="timeAndDatePicker">
                <Typography style={{ marginLeft: '5px', marginTop: '30px' }} variant="h6" id="modal-title">
                  Select Time/Date
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
                      <TextField
                        className={classes.textField}
                        multiline
                        rowsMax="6"
                        onChange={event => this.handleChange(event, 'notes')} label="Notes"
                        value={this.state.notes}
                      ></TextField>
                      <form className={classes.radio}>
                        Offer
                      <Radio
                          label="Offer"
                          labelPlacement="top"
                          checked={this.state.offer_needed === 'true'}
                          onChange={this.handleRequestStatus}
                          value='true'
                          color="primary"
                          name="radio-button-demo"
                          aria-label='true'
                        />
                        Need
                      <Radio
                          label="Need"
                          labelPlacement="top"
                          checked={this.state.offer_needed === 'false'}
                          onChange={this.handleRequestStatus}
                          value='false'
                          color="primary"
                          name="radio-button-demo"
                          aria-label=''
                        />
                      </form>
                      <Link to='/calendar'>
                        <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}
                          style={{ width: '140px', margin: '5px 0px 0px 0px' }}
                        >SUBMIT</Button>
                      </Link>
                      <Button variant="contained" color="red" onClick={this.handleCancel} style={{ width: '140px', margin: '5px 0px 30px 0px' }}> CANCEL </Button>
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