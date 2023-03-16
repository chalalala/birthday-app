import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
} from '@syncfusion/ej2-react-schedule';
import React, { useState } from 'react';
import '../styles/components/_calendar.scss';
import { useBirthdayListContext } from '../../contexts/BirthdayListContext';
import { createEventObject } from '../../utils/calendarEvent';

export default function BirthdayCalendar() {
  const { birthdayList, addEntry, deleteEntry } = useBirthdayListContext();
  const eventList = birthdayList.map((entry, index) =>
    createEventObject(index, new Date(entry.dob), entry),
  );
  // const [eventList, setEventList] = useState<IEvent[]>([]);
  // const [birthdayList, setBirthdayList] = useState<IEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tooltipTemplate: string =
    '<div class="tooltip-wrap"><div class="content-area"><div class="name">${Subject}</></div>';

  const onActionComplete = (action: any) => {
    console.log(action);

    switch (action.requestType) {
      case 'eventCreated': {
        addEntry(action.addedRecords);
        break;
      }
      case 'eventRemoved': {
        deleteEntry(action.deletedRecords);
        break;
      }
    }
  };

  const onEventClick = (args: any) => {
    setSelectedDate(args.startTime);
  };

  return (
    <React.Fragment>
      <ScheduleComponent
        selectedDate={selectedDate}
        firstDayOfWeek={1}
        timeScale={{
          enable: false,
        }}
        eventSettings={{
          dataSource: eventList,
          allowAdding: true,
          allowDeleting: true,
          allowEditing: true,
          enableTooltip: true,
          tooltipTemplate: tooltipTemplate,
        }}
        cellClick={onEventClick}
        actionComplete={onActionComplete}
        height={550}
        cssClass="birthday-calendar"
      >
        <ViewsDirective>
          <ViewDirective option="Month" />
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </React.Fragment>
  );
}
