import { buildBirthdayCalendar, utf8Size } from './calendarExport';

describe('buildBirthdayCalendar', () => {
  it('creates a yearly all-day event for each entry', () => {
    const { content, exported, skipped } = buildBirthdayCalendar([
      { id: 1, name: 'Anna, Smith', dob: '03/15/1990', contact: 'a@b.com' },
    ]);

    expect(exported).toBe(1);
    expect(skipped).toBe(0);
    expect(content).toContain('DTSTART;VALUE=DATE:19900315');
    expect(content).toContain('DTEND;VALUE=DATE:19900316');
    expect(content).toContain('RRULE:FREQ=YEARLY\r\n');
    expect(content).toContain("SUMMARY:🎂 Anna\\, Smith's birthday");
    expect(content).toContain('DESCRIPTION:a@b.com');
  });

  it('moves Feb 29 birthdays to the last day of February', () => {
    const { content } = buildBirthdayCalendar([
      { id: 2, name: 'Leap', dob: '02/29/2000' },
    ]);

    expect(content).toContain('RRULE:FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=-1');
  });

  it('skips entries without a readable date', () => {
    const { exported, skipped } = buildBirthdayCalendar([
      { id: 3, name: 'Nobody', dob: 'not a date' },
    ]);

    expect(exported).toBe(0);
    expect(skipped).toBe(1);
  });

  it('folds long lines to 75 octets', () => {
    const { content } = buildBirthdayCalendar([
      { id: 4, name: 'Ä'.repeat(100), dob: '01/01/1990' },
    ]);

    content.split('\r\n').forEach((line) => {
      expect(
        Array.from(line).reduce((size, char) => size + utf8Size(char), 0),
      ).toBeLessThanOrEqual(75);
    });
  });
});
