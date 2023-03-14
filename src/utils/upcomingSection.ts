import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import { IEntry } from '../types/IEntry';
import { db } from './firebase';

const RANGE_OF_UPCOMING_BIRTHDAYS = 7;

export const getUpcomingBirthdayList = async (user: any) => {
  const docRef = doc(db, user.email, 'birthday-list');
  const birthdayDoc = await getDoc(docRef);

  if (birthdayDoc.exists()) {
    const startDate = moment();
    const endDate = moment().add(RANGE_OF_UPCOMING_BIRTHDAYS, 'day');
    return [...birthdayDoc.data().birthdayList].filter((item) =>
      moment(item.dob, 'MM/DD/YYYY').isBetween(startDate, endDate, 'day', '[]'),
    ) as IEntry[];
  } else {
    return [];
  }
};

export const getUpcomingDateMessage = (daysLeft: number) => {
  if (daysLeft === 0) {
    return '🔥 Today';
  }

  return `${daysLeft} ${daysLeft > 1 ? 'days' : 'day'} left`;
};
