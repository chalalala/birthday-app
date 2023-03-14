import { useEffect, useState } from 'react';
import '../styles/components/_upcomingSection.scss';
import { IEntry } from '../types/IEntry';
import { useAuthState } from '../utils/auth';
import { getDiffDate } from '../utils/date';
import { getUpcomingBirthdayList } from '../utils/upcomingSection';
import { BirthdayCard } from './BirthdayCard';

export const UpcomingSection = () => {
  const { user } = useAuthState();
  const [birthdayList, setBirthdayList] = useState<IEntry[]>([]);

  const fetchUpcomingBirthdays = async () => {
    const list: IEntry[] = await getUpcomingBirthdayList(user);
    const sortedList = list.sort((a, b) => getDiffDate(a.dob, b.dob));
    setBirthdayList(sortedList);
  };

  useEffect(() => {
    fetchUpcomingBirthdays();
  }, []);

  return (
    <div className="upcoming-section">
      <div className="header-title">Upcoming Birthdays</div>
      {birthdayList.map((birthday: IEntry) => (
        <BirthdayCard
          key={birthday.id}
          birthday={birthday}
        />
      ))}
    </div>
  );
};
