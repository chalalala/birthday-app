import { IEntry } from '../types/IEntry';
import '../styles/components/_birthdayCard.scss';
import moment from 'moment';

interface IProps {
  birthday: IEntry;
}

const DATE_FORMAT = 'MM/DD/YYYY';

export const BirthdayCard = ({ birthday }: IProps) => {
  // Diff date and excluding time
  const daysLeft = moment(birthday.dob, DATE_FORMAT)
    .startOf('day')
    .diff(moment(Date.now()).startOf('day'), 'days');

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
