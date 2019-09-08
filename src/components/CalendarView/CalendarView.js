import React, { Component } from 'react';
import Calendar from 'react-calendar'
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux';
import EventView from '../EventView/EventView';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Day } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  grid: {
    width: '60%',
  },
  calendar: {
    width: '375px',
    border: 'solid black 2px'
  },
});

class CalendarView extends Component {
    state = {
        date: new Date(),
        event_date:{event_date: new Date().getFullYear() + "-" +  0+Number(new Date().getMonth()+1) + "-" + new Date().getDate()},
        dateToSend: '',
        dateToDisplay: '',
      }

      componentDidMount() {
        let day = new Date();
        let newDayToDisplay = ( day.getFullYear() + "-" +  0+Number(day.getMonth()+1) + "-" + day.getDate())
        // newDayToDisplay.toString().substring(1,10)
        this.setState({
          dateToDisplay: newDayToDisplay
        })
        let newDate = ( day.getFullYear() + "-" +  0+Number(day.getMonth()+1) + "-" + day.getDate())
        let newObjectToSend = {event_date: newDate}
        console.log('IN HANDLE CHANGE WITH NEW DATE:', newObjectToSend);
        this.setState({
          dateToSend: newObjectToSend
        })
        this.props.dispatch({type: 'FETCH_EVENTS', payload: this.state.event_date})
      }

      handleChange = (value) => {
        this.setState({
          event: !this.state.event
        })
        let newDate = ( value.getFullYear() + "-" +  0+Number(value.getMonth()+1) + "-" + value.getDate())
        let newObjectToSend = {event_date: newDate}
        console.log('IN HANDLE CHANGE WITH NEW DATE:', newObjectToSend);
        this.setState({
          dateToSend: newObjectToSend
        })
      }

      // getEvents =  () => {
      //   console.log('in get events');
        //this.props.dispatch({type: 'FETCH_EVENTS', payload: this.state})
      // }
     
      //onChange = date => this.setState({ date })

      // Formate value which is date to read as YY-MM-DD
      // Set value to a variable and run a dispatch to fetch
      // that value from the DB.
      formatDate =(value)=>{
        console.log('in format date', value)
       //let newDate = ( value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear());
      let newDate = ( value.getFullYear() + "-" +  0+Number(value.getMonth()+1) + "-" + value.getDate())
        
      let newObjectToSend = {event_date: newDate}
      this.props.dispatch({type: 'FETCH_EVENTS', payload: newObjectToSend})
      console.log('NEW OBJECT TO SEND (CALENDAR VIEW):', newObjectToSend);
      }

      newDayToSend = (value) => {
        let newDate = ( value.getFullYear() + "-" +  0+Number(value.getMonth()+1) + "-" + value.getDate())
        let newObjectToSend = {event_date: newDate}
        console.log('IN NEW DAY TO SEND WITH NEW DATE:', newObjectToSend);
      }
     
      render() {
        const { classes } = this.props;
        console.log('this is state', this.state)
        if (this.state.dateToDisplay === this.state.dateToSend) {
        return (
          <>
          <div>
            <Calendar
              className={classes.calendar}
              onChange={(event) => this.formatDate(event)}
              value={this.state.date}
              onClickDay={this.handleChange}
              onClick={this.newDayToSend}
            />
            {/* <Typography>
            {this.state.dateToDisplay.toString().substring(0, 10)}
            </Typography> */}
          </div>
          <div>
            <EventView date={this.state.dateToSend.event_date}
            //  dateToSendToSaga={this.state.dateToSendToSaga}
            />
          </div>
          </>
        )} else {
          return (
          <>
          <div>
            <Calendar
              className={classes.calendar}
              onChange={(event) => this.formatDate(event)}
              value={this.state.date}
              onClickDay={this.handleChange}
              onClick={this.newDayToSend}
            />
            </div>
            <div>
            <EventView date={this.state.dateToSend.event_date} history={this.props.history}/>
          </div>
          </>
          )}
      }
}

export default withStyles(styles)(connect()(CalendarView));