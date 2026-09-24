import { IEntry } from '../types/IEntry';
import { getDaysUntilBirthday } from './date';
import { getUpcomingBirthdayList } from './upcomingSection';

const entry = (id: number, dob: string): IEntry => ({
  id,
  name: `Person ${id}`,
  dob,
});

describe('getDaysUntilBirthday', () => {
  it('returns 0 when the birthday is today', () => {
    expect(getDaysUntilBirthday('03/14/1990', '2026-03-14T18:30:00')).toBe(0);
  });

  it('counts days to a birthday later this year', () => {
    expect(getDaysUntilBirthday('03/20/1990', '2026-03-14')).toBe(6);
  });

  it('wraps to next year when the birthday has passed', () => {
    expect(getDaysUntilBirthday('01/02/1990', '2026-12-28')).toBe(5);
  });

  it('uses Feb 28 for Feb 29 birthdays in non-leap years', () => {
    expect(getDaysUntilBirthday('02/29/2000', '2027-02-25')).toBe(3);
  });

  it('uses Feb 29 for Feb 29 birthdays in leap years', () => {
    expect(getDaysUntilBirthday('02/29/2000', '2028-02-25')).toBe(4);
  });

  it('wraps a Feb 29 birthday into the next year', () => {
    expect(getDaysUntilBirthday('02/29/2000', '2027-03-01')).toBe(365);
  });
});

describe('getUpcomingBirthdayList', () => {
  it('includes birthdays in the next 7 days, sorted by days left', () => {
    const list = [
      entry(1, '03/20/1990'),
      entry(2, '03/14/1985'),
      entry(3, '03/22/1992'),
      entry(4, '03/13/1980'),
    ];

    expect(
      getUpcomingBirthdayList(list, '2026-03-14').map(({ id }) => id),
    ).toEqual([2, 1]);
  });

  it('includes early January birthdays at the end of December', () => {
    const list = [
      entry(1, '01/03/1990'),
      entry(2, '12/30/1985'),
      entry(3, '01/10/1992'),
    ];

    expect(
      getUpcomingBirthdayList(list, '2026-12-28').map(({ id }) => id),
    ).toEqual([2, 1]);
  });
});
