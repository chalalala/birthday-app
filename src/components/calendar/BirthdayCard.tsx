import { IEntry } from 'types/IEntry';
import moment from 'moment';
import { getUpcomingDateMessage } from 'utils/upcomingSection';
import { DATE_FORMAT, getDiffDate } from 'utils/date';
import 'styles/components/_birthdayCard.scss';

interface IProps {
  birthday: IEntry;
}

export const BirthdayCard = ({ birthday }: IProps) => {
  const daysLeft = getDiffDate(birthday.dob, Date.now());

  return (
    <div className="card-container">
      <div className="time-wrapper">
        <p className="card-container__month">
          {moment(birthday.dob, DATE_FORMAT).format('MMM')}
        </p>
        <p className="card-container__date">
          {moment(birthday.dob, DATE_FORMAT).get('D')}
        </p>
      </div>
      <div className="info-wrapper">
        <div className="days-count-txt">{getUpcomingDateMessage(daysLeft)}</div>
        <div className="name-txt">{birthday.name}</div>
        <div className="contact-txt">{birthday.contact}</div>
      </div>
    </div>
  );
};
