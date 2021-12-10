import React from "react";
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';
import './Calendar.css';

class Calendar extends React.Component {   
      render() {
        
        const datevalue: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        return (
          <div className="calendar">
            <CalendarComponent value={datevalue} ></CalendarComponent>
          </div>
        );
    }
}

export default Calendar;