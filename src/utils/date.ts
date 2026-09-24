import moment from 'moment';

export const DATE_FORMAT = 'MM/DD/YYYY';

/**
 *  Get number of days from today until the next occurrence of a birthday,
 *  ignoring year and time. Returns 0 when the birthday is today.
 *  Feb 29 birthdays fall on Feb 28 in non-leap years.
 */
export const getDaysUntilBirthday = (
  dob: moment.MomentInput,
  today: moment.MomentInput = moment(),
) => {
  const birthday = moment(dob, DATE_FORMAT);
  const startOfToday = moment(today).startOf('day');

  let nextBirthday = birthday.clone().year(startOfToday.year());

  if (nextBirthday.isBefore(startOfToday, 'day')) {
    nextBirthday = birthday.clone().year(startOfToday.year() + 1);
  }

  return nextBirthday.startOf('day').diff(startOfToday, 'days');
};
