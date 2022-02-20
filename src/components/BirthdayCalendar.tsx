import React, { useEffect, useState } from "react";
import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "../contexts/AuthContext";
import { db } from '../utils/firebase';
import recurDate from '../utils/recurDate';
import { IEvent } from "../types/IEvent";

export default function BirthdayCalendar() {
    const { user } = useAuthState();
    const [eventList, setEventList] = useState(new Array<IEvent>());

    const getEventList = async () => {
        const docRef = doc(db, user.email, "birthday-list");
        const birthdayDoc = await getDoc(docRef);

        if (birthdayDoc.exists()) {
            let birthdayList = [...birthdayDoc.data().birthdayList];
            let newArray = new Array<IEvent>();
            
            birthdayList.forEach(user => {
                let bday = new Date(user.dob);
                let recurDates = recurDate(bday);
                let events:Array<IEvent> = recurDates.map((date, index) => (
                    {
                        Id: index,
                        Subject: user.nickname !== '' ? user.nickname : user.name,
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