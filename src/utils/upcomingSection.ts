import moment from 'moment';
import { IEntry } from '../types/IEntry';
import { getDaysUntilBirthday } from './date';

const RANGE_OF_UPCOMING_BIRTHDAYS = 7;

export const getUpcomingBirthdayList = (
  birthdayList: IEntry[],
  today: moment.MomentInput = moment(),
) => {
  if (!birthdayList.length) {
    return [];
  }

  return birthdayList
    .map((item) => ({
      item,
      daysLeft: getDaysUntilBirthday(item.dob, today),
    }))
    .filter(({ daysLeft }) => daysLeft <= RANGE_OF_UPCOMING_BIRTHDAYS)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .map(({ item }) => item);
};

export const getUpcomingDateMessage = (daysLeft: number) => {
  if (daysLeft === 0) {
    return '🔥 Today';
  }

  return `${daysLeft} ${daysLeft > 1 ? 'days' : 'day'} left`;
};
