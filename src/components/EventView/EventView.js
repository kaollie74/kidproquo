import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import '../App/App.css';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';
import { Iconbutton } from 'semantic-ui-react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { Table, Card} from 'semantic-ui-react';
import { getThemeProps } from '@material-ui/styles';

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
  textField: {
    margin: '0px 0px 10px 0px',
    maxWidth: '400px'
  },
  radio: {
    color: '#033076',
    fontWeight: '900',
    display: 'inline-block',
    padding: '0',
    marginLeft: '20px',
    width: '200px',
    height: '50px',
    backgroundColor: 'white'
  },
  date: {
    textAlign: 'center',
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
    border: 'solid 1px white',
    backgroundColor: '#89E894',
    borderRadius: '3px'
  },
  addButton: {
    fontWeight: 'bold'
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
    let notes = this.state.notes;
    let offer_needed = this.state.offer_needed;
    let newEventToSend = {
      event_date: newDate,
      event_time_start: newTimeStart,
      event_time_end: newTimeEnd,
      requester_id: this.props.reduxStore.family.id,
      group_id: this.props.reduxStore.userGroups[0].id,
      notes: notes,
      offer_needed: offer_needed,
    }
    console.log(newDate);
    console.log(newTimeStart);
    console.log(newTimeEnd);
    console.log('THIS IS THE OBJECT TO SEND TO SAGA!!!!!!!!!', newEventToSend);
    this.props.dispatch({ type: 'ADD_REQUEST', payload: newEventToSend })
    this.props.dispatch({ type: 'FETCH_EVENTS', payload: newEventToSend.event_date})
    this.setState({
      event_date: new Date (),
      event_time_start: new Date (), 
      event_time_end: new Date (),
      notes: '',
    })
    this.openModal();
    this.confirmRequest();
  }

  confirmRequest = () => {
    this.props.history.push('/calendar');
    console.log('IN CONFIRM REQUEST WITH')
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
    console.log('this is state', this.state)
    console.log('THIS IS THIS.PROPS.DATE:', this.props.date)
    const { classes } = this.props;
    if (this.props.reduxStore.calendar.length !== 0) {
      return (
        <>
        <Button className={classes.button} variant="contained" color="primary" onClick={this.openModal}>Create Request</Button>
          <h2 className={classes.date}> {this.props.date}</h2>
          <hr className={classes.hr}/>
          <h3 className={classes.openRequests}> Open Requests </h3>
          <Modal
            aria-labelledby="simple-modal-title"
            arai-describedby="simple-modal-description"
            open={this.state.open}
            //onClose={this.openModal}
          >
            <div className={classes.paper}>
              <Typography variant="h6" id="modal-title">
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
                <Link to ='/calendar'>
                <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}>Submit Request</Button>
                </Link>
                <Button variant="contained" color="secondary" onClick={this.handleCancel}> Cancel</Button>
                
                {/* </Typography> */}
              </Grid>
            </div>
          </Modal>
          <Card.Group className="ui grid container">
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
                className="seven wide column" 
                key={item.id}
                >
                <Card.Content className="ui orange card">
                  <Card.Header>{item.last_name1} </Card.Header>
                  <Card.Meta>{item.event_time_start} - {item.event_time_end}</Card.Meta>
                  <Card.Description>{item.notes}</Card.Description>
                  <Card.Description className={item.offer_needed ? "ui blue label" : "ui orange label"}><p>{item.offer_needed ? 'Offering' : 'Needed'}</p></Card.Description>
                  {/* <div className={classes.claimRequestButton}>
                  <Button className={classes.claimRequestButton} color="green"  onClick={(event) => this.handleClaim(event, item)}>
                  <Icon floated="right" name="plus circle" size="large" basic color="white"></Icon>
                  </Button>
                  </div> */}
                  {/* <Button className={classes.claimButton} positive icon="plus circle">
                    
                  </Button> */}
                  <br/>
                  <Button className={classes.addButton}>
                  CLAIM
                  <AddIcon className={classes.add}></AddIcon>
                  </Button>
                </Card.Content>
                </Card>
              ))}


            
          </Card.Group>
        </>

      ) // return
    } else {
      return (
        <>
          <div>
            <Button className={classes.button} variant="contained" color="primary" onClick={this.openModal}>Create Request</Button>
            <h2 className={classes.date}> {this.props.date}</h2>
            <hr className={classes.hr}/>
            <h3 className={classes.openRequests}> No Requests </h3>
            <Modal
              aria-labelledby="simple-modal-title"
              arai-describedby="simple-modal-description"
              open={this.state.open}
              //onClose={this.openModal}
            >
              <div className={classes.paper}>
                <Typography variant="h6" id="modal-title">
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
                      <Link to = '/calendar'>
                      <Button variant="contained" color="primary" onClick={(event) => this.handleCreateRequest()}>Submit Request</Button>
                      </Link>
                      <Button variant="contained" color="secondary" onClick={this.handleCancel}> Cancel</Button>
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