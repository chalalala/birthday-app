import { IEntry } from '../types/IEntry';
import '../styles/components/_birthdayCard.scss';
import moment from 'moment';

interface IProps {
  birthday: IEntry;
}

const DATE_FORMAT = 'MM/DD/YYYY';

export const BirthdayCard = ({ birthday }: IProps) => {
  const daysLeft = moment(birthday.dob, DATE_FORMAT).diff(moment(), 'days');

  return (
    <div className="card-container">
      <div className="time-wrapper">
        <h3>{moment(birthday.dob, DATE_FORMAT).format('MMM')}</h3>
        <h1>{moment(birthday.dob, DATE_FORMAT).get('D')}</h1>
      </div>
      <div className="info-wrapper">
        <div className="days-count-txt">
          {daysLeft}
          {daysLeft > 1 ? ' days left' : ' day left'}
        </div>
        <div className="name-txt">{birthday.name}</div>
        <div className="contact-txt">{birthday.contact}</div>
      </div>
    </div>
  );
};
