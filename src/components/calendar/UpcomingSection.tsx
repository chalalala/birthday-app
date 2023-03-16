import { useBirthdayListContext } from 'contexts/BirthdayListContext';
import 'styles/components/_upcomingSection.scss';
import { IEntry } from 'types/IEntry';
import { getUpcomingBirthdayList } from 'utils/upcomingSection';
import { BirthdayCard } from './BirthdayCard';

export const UpcomingSection = () => {
  const { birthdayList } = useBirthdayListContext();
  const upcomingBirthdays = getUpcomingBirthdayList(birthdayList);

  return (
    <div className="upcoming-section">
      <div className="header-title">Upcoming Birthdays</div>

      {upcomingBirthdays.map((birthday: IEntry) => (
        <BirthdayCard
          key={birthday.id}
          birthday={birthday}
        />
      ))}
    </div>
  );
};
