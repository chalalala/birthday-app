import { useEffect, useState } from 'react';
import { useAuthState } from '../contexts/AuthContext';
import '../styles/components/_upcomingSection.scss';
import { IEntry } from '../types/IEntry';
import { getUpcomingBirthdayList } from '../utils/maintainBirthdayList';
import { BirthdayCard } from './BirthdayCard';

export const UpcomingSection = () => {
  const { user } = useAuthState();
  const [birthdayList, setBirthdayList] = useState<IEntry[]>([]);

  const fetchUpcomingBirthdays = async () => {
    const list: IEntry[] = await getUpcomingBirthdayList(user);
    setBirthdayList(list);
  };

  useEffect(() => {
    fetchUpcomingBirthdays();
  }, []);

  return (
    <div>
      <div className="header-title">Upcoming Birthdays</div>
      {birthdayList.map((birthday: IEntry) => (
        <BirthdayCard birthday={birthday} />
      ))}
    </div>
  );
};
