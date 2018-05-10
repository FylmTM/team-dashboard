import moment from 'moment';

/**
 * https://gist.github.com/icemilo/a0b98a1508aab82853eb
 */
export function calculateBusinessDays(firstDate, secondDate) {
  //Initiallize variables
  let day1 = moment(firstDate);
  let day2 = secondDate ? moment(secondDate) : moment();
  let adjust = 0;

  if (day1.dayOfYear() === day2.dayOfYear() && day1.year() === day2.year()) {
    return 0;
  }

  //Check if second date is before first date to switch
  // if (day2.isBefore(day1)) {
  //     day2 = moment(firstDate);
  //     day1 = moment(secondDate);
  // }

  //Check if first date starts on weekends
  if (day1.day() === 6) {
    //Saturday
    //Move date to next week monday
    day1.day(8);
  } else if (day1.day() === 0) {
    //Sunday
    //Move date to current week monday
    day1.day(1);
  }

  //Check if second date starts on weekends
  if (day2.day() === 6) {
    //Saturday
    //Move date to current week friday
    day2.day(5);
  } else if (day2.day() === 0) {
    //Sunday
    //Move date to previous week friday
    day2.day(-2);
  }

  const day1Week = day1.week();
  let day2Week = day2.week();

  //Check if two dates are in different week of the year
  if (day1Week !== day2Week) {
    //Check if second date's year is different from first date's year
    if (day2Week < day1Week) {
      day2Week += day1Week;
    }
    //Calculate adjust value to be substracted from difference between two dates
    adjust = -2 * (day2Week - day1Week);
  }

  return day2.diff(day1, 'days') + adjust;
}
