export interface IEvent {
  Id: Number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  IsAllDay: boolean;
  RecurrenceRule: string;
}
