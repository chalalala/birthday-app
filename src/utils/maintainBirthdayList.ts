import { doc, getDoc, setDoc } from 'firebase/firestore';
import moment from 'moment';
import { IEntry } from '../types/IEntry';
import { db } from './firebase';

export const uploadBirthdayList = async (
  birthdayList: Array<IEntry>,
  user: any,
) => {
  await setDoc(doc(db, user.email, 'birthday-list'), { birthdayList })
    .then(() => {
      console.log('Uploaded ', birthdayList);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getBirthdayList = async (user: any, setFunc: Function) => {
  const docRef = doc(db, user.email, 'birthday-list');
  const birthdayDoc = await getDoc(docRef);

  if (birthdayDoc.exists()) {
    setFunc(birthdayDoc.data().birthdayList);
  } else {
    console.log('No data');
  }
};

const RANGE_OF_UPCOMING_BIRTHDAYS = 7;

export const getUpcomingBirthdayList = async (user: any) => {
  const docRef = doc(db, user.email, 'birthday-list');
  const birthdayDoc = await getDoc(docRef);

  if (birthdayDoc.exists()) {
    const startDate = moment();
    const endDate = moment().add(RANGE_OF_UPCOMING_BIRTHDAYS, 'day');
    return [...birthdayDoc.data().birthdayList].filter((item) =>
      moment(item.dob, 'MM/DD/YYYY').isBetween(startDate, endDate),
    ) as IEntry[];
  } else {
    return [];
  }
};
