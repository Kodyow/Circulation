import React, {useState, useEffect} from 'react';
import Axios from 'axios';
//import Calendar from "./Calendar";
import './Calendar.css';
import { Table } from './Table';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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

 const CalSched = () => {
    const [events, getEvent] = useState([]);
    const [header, setHeader] = useState(["Group Name", "Event Name", "Location", "Starts", "Ends", "Accepted Count", "Canceled Count","No Reply Count"]);
    const [date, setdate] = useState(new Date());
    const [dateTime, setDatetime] = useState("");
    const navigate = useNavigate();
  

    useEffect(() => {
      console.log(date);
      if (date.value) {
        handleOnCalendar()
      }
    }, []);

    // useEffect(() => {
    //     handleOnCalendar()
    // }, []);
    
    const handleOnCalendar = (inputdate) => {
      var mydate = "";
      mydate = format(new Date(inputdate),`yyyy-MM-dd`)
      console.log(mydate);
      Axios.post("http://localhost:5000/calendar", {
        selectdate: mydate
      }).then((response) => {
        getEvent(response.data);
        console.log(response);
      });
    }

    const handleOnClick = (id) => {
      navigate(`/event/${id}`)
    }

    return (
      <>
          <div className="calendar group-container clearfix">
          <CalendarComponent change={(e) => handleOnCalendar(e.value.toISOString())} value={date}/>
          {/* <div>Conflicting Events - {date.value && date.value.toDateString()} {events.currentValue && date.value}</div> */}
          <div className="my-events">
              <h2>Events</h2>
                  <table className="event table table-hover">
                    <thead>
                        <tr className="table-primary">
                            {
                                header.map((element,i)=>
                                    <th scope="col" key={i}>{element}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                              events?
                                events.map((element, index)=>
                                        <tr key={element.ID} onClick={ (event) => handleOnClick(element.ID)}>  
                                                <td>{element.GroupName}</td>
                                                <td>{element.EventName}</td>
                                                <td>{element.Location}</td>
                                                <td>{format(new Date(element.StartDate),`dd/MM/yy H:mm`)}</td>
                                                <td>{format(new Date(element.EndDate),`dd/MM/yy H:mm`)}</td>
                                                <td>{element.Acount}</td>
                                                <td>{element.Ccount}</td>
                                                <td>{element.NRcount}</td>
                                        </tr>

                                )  : <></>                      
                            }
                    </tbody>
                  </table>
                </div>
          </div>

      </>

    )
}
  
  export default CalendarApp;

