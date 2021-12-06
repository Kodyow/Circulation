import React from "react";
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';
import './Calendar.css';
// import dateFns from "date-fns";

class Calendar extends React.Component {
    // state = {
    //     currentMonth: new Date(),
    //     selectedDate: new Date()
    //   };
    
    //   renderHeader() {}
    
    //   renderDays() {}
    
    //   renderCells() {}
    
    //   onDateClick = day => {};
    
    //   nextMonth = () => {};
    
    //   prevMonth = () => {};
    
      render() {
        const datevalue: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 2);
        return (
          <div className="calendar">
            <CalendarComponent value={datevalue}></CalendarComponent>
          </div>
        );
    }
}

export default Calendar;