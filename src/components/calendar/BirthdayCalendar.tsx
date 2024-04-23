import React, { useState } from 'react';
import { useBirthdayListContext } from 'contexts/BirthdayListContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import BirthdayEntryModal from 'components/commons/BirthdayModal/BirthdayEntryModal';
import { ModalType } from 'types/Modal';
import { IEntry } from 'types/IEntry';
import 'styles/components/_calendar.scss';

export default function BirthdayCalendar() {
  const { birthdayList } = useBirthdayListContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<IEntry | undefined>();

  if (!birthdayList) {
    return null;
  }

  return (
    <React.Fragment>
      <FullCalendar
        selectable
        plugins={[dayGridPlugin, rrulePlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prevYear,prev,next,nextYear',
          center: 'title',
          right: 'today dayGridMonth,dayGridWeek,dayGridYear',
        }}
        initialView="dayGridWeek"
        contentHeight="100%"
        height="100%"
        monthStartFormat={{ day: '2-digit', month: 'short' }}
        stickyHeaderDates={true}
        events={birthdayList.map((event) => ({
          id: event.id.toString(),
          title: event.name,
          allDay: true,
          rrule: {
            freq: 'yearly',
            dtstart: moment(event.dob).format('YYYY-MM-DD'),
            interval: 1,
          },
        }))}
        firstDay={1}
        dateClick={(info) => {
          setSelectedDate(info.date);
        }}
        eventClick={(info) => {
          const selectedEntry = birthdayList.find(
            (entry) => entry.id.toString() === info.event.id,
          );

          setSelectedEntry(selectedEntry);
        }}
      />

      {!!selectedDate || !!selectedEntry ? (
        <BirthdayEntryModal
          open={!!selectedDate || !!selectedEntry}
          handleClose={() => {
            setSelectedDate(null);
            setSelectedEntry(undefined);
          }}
          type={selectedEntry ? ModalType.UPDATE : ModalType.ADD}
          selectedDate={selectedDate}
          entry={selectedEntry}
        />
      ) : null}
    </React.Fragment>
  );
}
