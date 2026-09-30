import { doc, setDoc } from 'firebase/firestore';
import { IEntry } from '../types/IEntry';
import { db } from './firebase';

export const uploadBirthdayList = async (
  birthdayList: Array<IEntry>,
  user: any,
) => {
  // Let errors reach the caller so it can tell the user the save failed
  await setDoc(doc(db, user.email, 'birthday-list'), { birthdayList });
};
