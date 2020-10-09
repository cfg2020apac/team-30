import "@fullcalendar/daygrid/main.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { Component } from 'react'

const events = [{ title: "Today", date: new Date() },{title:"Youth Opportunity: Help at animal shelter in Yuen Long",date: '2020-10-17'}];

export class Calendar extends Component {

    handleEventClick= ({e}) => {
      window.location.href='http://google.com';
    }


    render() {
        return (
            <div className="container">
                <div className="row title" style={{ marginTop: "20px" }} >
                </div>
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    eventClick={this.handleEventClick}
                    events={events}
                />
            </div>
        )
    }
}

export default Calendar
