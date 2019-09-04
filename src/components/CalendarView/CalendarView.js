import React, { Component } from 'react';
import Calendar from 'react-calendar'
import 'semantic-ui-css/semantic.min.css'
  
class CalendarView extends Component {
    state = {
        date: new Date(),
      }
     
      onChange = date => this.setState({ date })
     
      render() {
          console.log(this.state)
        return (
          <div>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
            />
          </div>
        );
      }
}

export default CalendarView;