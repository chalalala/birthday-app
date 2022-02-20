import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "../contexts/AuthContext";
import { IEntry } from "../types/IEntry";
import { IEvent } from "../types/IEvent";
import { db } from '../utils/firebase';

export default function BirthdayCalendar() {
    const { user } = useAuthState();
    const [eventList, setEventList] = useState(new Array<IEvent>());

    const createEventObject = (index: Number, date: Date, entry: IEntry):IEvent  => (
        {
            Id: index,
            Subject: entry.nickname !== '' ? entry.nickname : entry.name,
            StartTime: date,
            EndTime: new Date(date),
            IsAllDay: true,
            RecurrenceRule: 'FREQ=YEARLY;INTERVAL=1'
        }
    )

    const getEventList = async () => {
        const docRef = doc(db, user.email, "birthday-list");
        const birthdayDoc = await getDoc(docRef);

        if (birthdayDoc.exists()) {
            let birthdayList = [...birthdayDoc.data().birthdayList];
            let newArray = birthdayList.map((entry, index) => createEventObject(index, new Date(entry.dob), entry));
            setEventList(newArray);
        }
        else {
            console.log("No data");
        }
    }

    const removeEvent = (index: Number) => {
        let newEventList = eventList.filter(event => event.Id !== index);
        setEventList(newEventList);
    }

    const onActionComplete = (action: string) => {
        switch (action) {
            case "eventRemove": {
                // removeEvent();
            }
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
                actionComplete={onActionComplete}
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