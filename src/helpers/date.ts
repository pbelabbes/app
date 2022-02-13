import moment, { Moment } from 'moment';

export function getDiffInDaysSinceStartGame(date: Date): number {
  // Day 1 of the game is the 08/01/2022
  const startDate: Moment = moment('2022-01-08');
  const searchingDate = moment(date.getTime()).endOf('day');

  const duration = searchingDate.diff(startDate);
  const durationDays = moment.duration(duration).asDays();
  const daysDuration = Math.ceil(durationDays);
  return daysDuration;
}
