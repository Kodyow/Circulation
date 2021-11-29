import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from "./components/Calendar";
import './Calender.css';

import reportWebVitals from './reportWebVitals';


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
          </main>
        </div>
      );
    }
  }
  
  export default CalendarApp;

ReactDOM.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();