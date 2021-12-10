import React, {useState, useEffect, componentDidMount} from 'react';
import Axios from 'axios';
//import Calendar from "./Calendar";
import './Calendar.css';
import { Table } from './Table';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
//import { setDate } from 'date-fns';

class CalendarApp extends React.Component {
    render() {
      return (
        <div className="App">
          <header>
            <div id="logo">
              <span className="icon">date_range</span>
              <span>
                react<b>calendar</b>
              </span>
            </div>
          </header>
          <main>
            <CalSched />
          </main>
        </div>
      );
    }
  }

 function CalSched () {
    const [events, getEvent] = useState([]);
    const [header, setHeader] = useState(["Name", "Location", "Starts", "Ends", "Details", "Date(s)", "Host", "Group"]);

    const [date, setdate] = useState(new Date());
    const [dateTime, setDatetime] = useState("");

    useEffect(() => {
      if (date.value) {
        setDatetime(date.value.toISOString());
        //console.log(date.events);
        // console.lo
      }
    }, [date]);

    useEffect(() => {
        Axios.get("http://localhost:5000/calendar").then((response) => {
            getEvent(response.data);
            console.log(response);
        });;
    }, [events]);

    return (
        <div className="calendar group-container clearfix">
          <CalendarComponent change={setdate} value={date}/>
          <div>Conflicting Events - {date.value && date.value.toDateString()} {events.currentValue && date.value}</div>
            <div className="my-events">
                <h2>Events</h2>
                {/* <GroupList cardClassName="my-card"/> */}
                <Table columns={header} query={events}/>
            </div>
        </div>
    )
}
  
  export default CalendarApp;

