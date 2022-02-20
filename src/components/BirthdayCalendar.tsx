import { Day, Inject, Month, ScheduleComponent, ViewDirective, ViewsDirective, Week } from '@syncfusion/ej2-react-schedule';
import { doc, getDoc } from "firebase/firestore";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useAuthState } from "../contexts/AuthContext";
import { IEntry } from "../types/IEntry";
import { IEvent } from "../types/IEvent";
import { db } from '../utils/firebase';
import { uploadBirthdayList } from '../utils/maintainBirthdayList';

export default function BirthdayCalendar() {
    const { user } = useAuthState();
    const [eventList, setEventList] = useState(new Array<IEvent>());
    const [birthdayList, setBirthdayList] = useState(new Array<IEntry>());

    const createEventObject = (index: Number, date: Date, entry: IEntry):IEvent  => {
        let bday = new Date(date);

        return (
        {
            Id: index,
            Subject: entry.nickname ? entry.nickname : entry.name,
            StartTime: date,
            EndTime: bday,
            IsAllDay: true,
            RecurrenceRule: `FREQ=YEARLY;BYMONTHDAY=${bday.getDate()};BYMONTH=${bday.getMonth() + 1};INTERVAL=1`,
        }
    )}

    const getEventList = async () => {
        const docRef = doc(db, user.email, "birthday-list");
        const birthdayDoc = await getDoc(docRef);

        if (birthdayDoc.exists()) {
            let birthdayList = [...birthdayDoc.data().birthdayList];
            let newArray = birthdayList.map((entry, index) => createEventObject(index, new Date(entry.dob), entry));
            setEventList(newArray);
            setBirthdayList(birthdayList);
        }
        else {
            console.log("No data");
        }
    }

    const addEntry = (addedRecords: any) => {
        let addedEntries = addedRecords.map((event: IEvent) => (
            {
                name: event.Subject,
                nickname: '',
                dob: moment(new Date(event.StartTime)).format("MM/DD/YYYY")
            }
        ))
        let newList = [...birthdayList];
        newList = newList.concat(addedEntries);
        setBirthdayList(newList);
        uploadBirthdayList(newList, user);
    }

    const deleteEntry = (deletedRecords: Array<IEvent>) => {
        let newList = [...birthdayList];
        deletedRecords.forEach(record => {
            newList = newList.filter((entry, index) => index !== record.Id);
        })
        setBirthdayList(newList);
        uploadBirthdayList(newList, user);
    }

    const onActionComplete = (action: any) => {
        console.log(action);

        switch (action.requestType) {
            case "eventCreated": {
                addEntry(action.addedRecords);
                break;
            }
            case "eventRemoved": {
                deleteEntry(action.deletedRecords);
                break;
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
                    allowEditing: false
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