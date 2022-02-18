import { doc, getDoc } from "firebase/firestore";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuthState } from "../contexts/AuthContext";
import { db } from '../utils/firebase';

export default function BirthdayCalendar() {
    const localizer = momentLocalizer(moment);
    const { user } = useAuthState();
    const [eventList, setEventList] = useState([]);
    
    // const myEventsList = [
    //     {
    //         title: "Hello 1",
    //         start: new Date(),
    //         end: new Date(),
    //         allDay: true
    //     }
    // ]

    const getEventList = async () => {
        const docRef = doc(db, user.email, "birthday-list");
        const birthdayDoc = await getDoc(docRef);
        if (birthdayDoc.exists()) {
            console.log(birthdayDoc.data());
            let newArray = birthdayDoc.data().map(entry => {
                let currentYearBirthday = entry.DOB.splice(-1, 1, new Date().getFullYear());
                return (
                    {
                        title: entry.Name,
                        start: new Date(currentYearBirthday),
                        end: new Date(currentYearBirthday),
                        allDay: true
                    }
                )
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
            <Calendar
                localizer={localizer}
                defaultView="month"
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </React.Fragment>
    )
}