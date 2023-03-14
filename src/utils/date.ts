import moment from 'moment';

export const DATE_FORMAT = 'MM/DD/YYYY';

/**
 *  Get difference in dates excluded time
 */
export const getDiffDate = (
  currentDate: moment.MomentInput,
  comparedDate: moment.MomentInput,
) => {
  return moment(currentDate, DATE_FORMAT)
    .startOf('day')
    .diff(moment(comparedDate).startOf('day'), 'days');
};
