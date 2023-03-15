import { IEntry } from '../types/IEntry';
import { IEvent } from '../types/IEvent';

export const createEventObject = (
  index: Number,
  date: Date,
  entry: IEntry,
): IEvent => {
  let bday = new Date(date);

  return {
    Id: index,
    Subject: entry.name,
    StartTime: date,
    EndTime: bday,
    IsAllDay: true,
    RecurrenceRule: `FREQ=YEARLY;BYMONTHDAY=${bday.getDate()};BYMONTH=${
      bday.getMonth() + 1
    };INTERVAL=1`,
  };
};
