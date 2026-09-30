import moment from 'moment';
import { IEntry } from '../types/IEntry';
import { DATE_FORMAT } from './date';

const ICS_DATE_FORMAT = 'YYYYMMDD';

/**
 *  Escape text values per RFC 5545 (backslash, semicolon, comma, newline)
 */
const escapeText = (text: string) =>
  text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

/**
 *  Fold lines longer than 75 octets, as required by RFC 5545
 */
export const utf8Size = (char: string) => {
  const code = char.codePointAt(0) ?? 0;

  if (code < 0x80) return 1;
  if (code < 0x800) return 2;
  if (code < 0x10000) return 3;
  return 4;
};

const foldLine = (line: string) => {
  const chunks: string[] = [];
  let current = '';
  let size = 0;

  Array.from(line).forEach((char) => {
    const charSize = utf8Size(char);
    // Continuation lines start with a space, which counts toward the limit
    const limit = chunks.length ? 74 : 75;

    if (size + charSize > limit) {
      chunks.push(current);
      current = '';
      size = 0;
    }

    current += char;
    size += charSize;
  });
  chunks.push(current);

  return chunks.join('\r\n ');
};

const buildEvent = (entry: IEntry, dob: moment.Moment, stamp: string) => {
  // Feb 29 birthdays fall on the last day of February in non-leap years
  const recurrence =
    dob.month() === 1 && dob.date() === 29
      ? 'RRULE:FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=-1'
      : 'RRULE:FREQ=YEARLY';

  return [
    'BEGIN:VEVENT',
    `UID:${entry.id}@birthday-app`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${dob.format(ICS_DATE_FORMAT)}`,
    `DTEND;VALUE=DATE:${dob.clone().add(1, 'day').format(ICS_DATE_FORMAT)}`,
    recurrence,
    `SUMMARY:${escapeText(`🎂 ${entry.name}'s birthday`)}`,
    ...(entry.contact ? [`DESCRIPTION:${escapeText(entry.contact)}`] : []),
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(`${entry.name}'s birthday is today`)}`,
    'TRIGGER:PT9H',
    'END:VALARM',
    'END:VEVENT',
  ];
};

/**
 *  Build an iCalendar file with a yearly all-day event for each entry.
 *  Entries with an unreadable DOB are skipped and counted.
 */
export const buildBirthdayCalendar = (birthdayList: IEntry[]) => {
  const stamp = moment.utc().format('YYYYMMDD[T]HHmmss[Z]');
  const events: string[] = [];
  let skipped = 0;

  birthdayList.forEach((entry) => {
    const dob = moment(entry.dob, DATE_FORMAT);

    if (!entry.name || !dob.isValid()) {
      skipped++;
      return;
    }

    events.push(...buildEvent(entry, dob, stamp));
  });

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Birthday App//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Birthdays',
    ...events,
    'END:VCALENDAR',
  ];

  return {
    content: lines.map(foldLine).join('\r\n') + '\r\n',
    exported: birthdayList.length - skipped,
    skipped,
  };
};

export const downloadCalendarFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
