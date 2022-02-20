import React, { useEffect, useState } from "react";
import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "../contexts/AuthContext";
import { db } from '../utils/firebase';
import recurDate from '../utils/recurDate';
import { IEvent } from "../types/IEvent";
import { IEntry } from "../types/IEntry";

export default function BirthdayCalendar() {
    const { user } = useAuthState();
    const [eventList, setEventList] = useState(new Array<IEvent>());

    const createEventObject = (index: Number, date: Date, entry: IEntry):IEvent  => (
        {
            Id: index,
            Subject: entry.nickname !== '' ? entry.nickname : entry.name,
            StartTime: date,
            EndTime: new Date(date),
            IsAllDay: true
        }
    )

    const getEventList = async () => {
        const docRef = doc(db, user.email, "birthday-list");
        const birthdayDoc = await getDoc(docRef);

        if (birthdayDoc.exists()) {
            let birthdayList = [...birthdayDoc.data().birthdayList];
            let newArray = new Array<IEvent>();
            
            birthdayList.forEach(entry => {
                let bday = new Date(entry.dob);
                let recurDates = recurDate(bday);
                let events = recurDates.map((date, index) => createEventObject(index, date, entry));
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
                    allowAdding: true,
                    allowDeleting: true,
                    allowEditing: true
                }}
                cssClass='birthday-calendar'
            >
                <ViewsDirective>
                    <ViewDirective option='Month'/>
                </ViewsDirective>
                <Inject services={[Day, Week, Month]}/>
            </ScheduleComponent>
        </React.Fragment>
    )
}