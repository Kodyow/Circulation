import React from 'react';
import Calendar from "./Calendar";
import './Calendar.css';



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
            <Calendar />
            <div class={` card text-white bg-secondary mb-3`} >
                <div class="card-header">Tag/GroupLink</div>
                <div class="card-body">
                    <h4 class="card-title">Name of Group</h4>
                    <p class="card-text">About group</p>
                </div>
            </div>
          </main>
        </div>
      );
    }
  }
  
  export default CalendarApp;

