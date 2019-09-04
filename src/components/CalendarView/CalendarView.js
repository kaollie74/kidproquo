import React, { Component } from 'react';
import Calendar from 'react-calendar'
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux';
  
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
        
        this.props.dispatch({type: 'FETCH_EVENTS', payload: this.state})
        
      }
     
      //onChange = date => this.setState({ date })

      formatDate =(value)=>{
        console.log('in format date', value)
       let newDate = ( value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear());
       this.setState({ date: newDate})
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
            {this.state.event ? this.getEvents() : ''}
          </div>
          </>
          
          

        );
      }

      
}

export default connect()(CalendarView);