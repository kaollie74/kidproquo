import React, { Component } from 'react';
import Calendar from 'react-calendar'
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux';
import EventView from '../EventView/EventView';
  
class CalendarView extends Component {
    state = {
        date: new Date(),
        event: false
      }

      handleChange = () => {
        this.setState({
          event: !this.state.event
        })
      }

      getEvents =  () => {
        console.log('in get events');
        
        //this.props.dispatch({type: 'FETCH_EVENTS', payload: this.state})
        
      }
     
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
       
      }
     
      render() {

          console.log('this is state', this.state)
        return (
          <>
          <div>
            <Calendar
              onChange={(event) => this.formatDate(event)}
              value={this.state.date}
              onClickDay={this.handleChange}
            />
          </div>
          <div>
            <EventView/>
          </div>
          </>
          
          

        );
      }

      
}

export default connect()(CalendarView);