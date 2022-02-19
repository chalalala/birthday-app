import { doc, getDoc } from "firebase/firestore";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuthState } from "../contexts/AuthContext";
import { db } from '../utils/firebase';
import recurDate from '../utils/recurDate';
import { ScheduleComponent,  Week, Month, Day, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

export default function BirthdayCalendar() {
    const localizer = momentLocalizer(moment);
    const { user } = useAuthState();
    const [eventList, setEventList] = useState([]);

    const getEventList = async () => {
        const docRef = doc(db, user.email, "birthday-list");
        const birthdayDoc = await getDoc(docRef);

        if (birthdayDoc.exists()) {
            let birthdayList = [...birthdayDoc.data().birthdayList];
            let newArray = [];
            
            birthdayList.forEach(user => {
                let bday = new Date(user.dob);
                let recurDates = recurDate(bday);
                let events = recurDates.map((date, index) => (
                    {
                        Id: index,
                        Subject: user.nickname,
                        StartTime: date,
                        EndTime: new Date(date),
                        IsAllDay: true
                    }
                ))
                newArray = newArray.concat(events);
            })
            setEventList(newArray);
        }
        else {
            console.log("No data");
        }
    }

    useEffect(() => {
        getEventList();
    }, []);

    return(
        <React.Fragment>
            <ScheduleComponent 
                selectedDate={new Date()}
                eventSettings={{
                    dataSource: eventList,
                    allowAdding: false, allowDeleting: false,
                    allowEditing: false
                }}
                cssClass='custom-class'
            >
                <ViewsDirective>
                    <ViewDirective option='Month'/>
                </ViewsDirective>
                <Inject services={[Day, Week, Month]}/>
            </ScheduleComponent>
        </React.Fragment>
    )
}