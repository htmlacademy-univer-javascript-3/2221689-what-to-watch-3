import { Months } from '../const';

export default function getDate(reviewDate: string) {
  const date = new Date(reviewDate);
  const month = date.getMonth() + 1 as keyof typeof Months;
  const day = date.getUTCDate();
  const year = date.getFullYear();
  return {day, month, year};
}
