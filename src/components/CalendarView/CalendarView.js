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
            >
                <Modal trigger={<Button align="center"></Button>}>
                    <Modal.header>{this.state.date}</Modal.header>
                    <Modal.content></Modal.content>
                </Modal>
            </Calendar>
          </div>
        );
      }
}

export default CalendarView;