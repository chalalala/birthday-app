import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "../contexts/AuthContext";
import { IEntry } from '../types/IEntry';
import { db } from '../utils/firebase';

export default function BirthdayList() {
  const { user } = useAuthState();
  const [list, setList] = useState([]);

  const getEventList = async () => {
		const docRef = doc(db, user.email, "birthday-list");
		const birthdayDoc = await getDoc(docRef);

		if (birthdayDoc.exists()) {
      let data = birthdayDoc.data();
      setList(data.birthdayList);
			console.log(data);
		} else {
			console.log("No data");
		}
  };

  useEffect(() => {
      getEventList();
  }, []);

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Birthday</th>
      </tr>

      { list.length > 0 && list.map((entry: IEntry) => (
        <tr key={entry.name + String(Date.now())}>
          <td>{entry.name}</td>
          <td>{moment(new Date(entry.dob)).format('DD/MM/YYYY')}</td>
        </tr>
      ))}
    </table>
  )
}
