import moment from 'moment';

export const DATE_FORMAT = 'MM/DD/YYYY';

/**
 *  Get difference in dates ignore year and time
 */
export const getDiffDate = (
  currentDate: moment.MomentInput,
  comparedDate: moment.MomentInput,
) => {
  const momentComparedDate = moment(comparedDate);

  return moment(currentDate, DATE_FORMAT)
    .startOf('day')
    .year(momentComparedDate.year())
    .diff(momentComparedDate.startOf('day'), 'days');
};
