import moment from 'moment';
import { IEntry } from '../types/IEntry';
import { getDiffDate } from './date';

const RANGE_OF_UPCOMING_BIRTHDAYS = 7;

export const getUpcomingBirthdayList = (birthdayList: IEntry[]) => {
  if (!birthdayList.length) {
    return [];
  }

  const startDate = moment();
  const endDate = moment().add(RANGE_OF_UPCOMING_BIRTHDAYS, 'day');

  const upcomingList = birthdayList.filter((item) =>
    moment(item.dob, 'MM/DD/YYYY').isBetween(startDate, endDate, 'day', '[]'),
  ) as IEntry[];

  return upcomingList.sort((a, b) => getDiffDate(a.dob, b.dob));
};

export const getUpcomingDateMessage = (daysLeft: number) => {
  if (daysLeft === 0) {
    return '🔥 Today';
  }

  return `${daysLeft} ${daysLeft > 1 ? 'days' : 'day'} left`;
};
