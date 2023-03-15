import { doc, setDoc } from 'firebase/firestore';
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
