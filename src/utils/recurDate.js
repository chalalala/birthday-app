import { RRule } from 'rrule';

const recurDate = (date) => {
   let currentDate = new Date();
   let dateThisYear = new Date(currentDate.getFullYear(), date.getMonth(), date.getDate());

   const rule = new RRule({
      freq: RRule.YEARLY,
      dtstart: dateThisYear,
      count: 3
   })

   return rule.all();
}

export default recurDate;