import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../const';

export default function getLeftTime(seconds: number) {
  if (seconds > SECONDS_IN_HOUR) {
    const hours = Math.trunc(seconds / SECONDS_IN_HOUR);
    const minutes = Math.trunc((seconds - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
    const leftSeconds = seconds - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE;
    return `-${`${hours}`.padStart(2, '0')}:${`${minutes}`.padStart(2, '0')}:${`${leftSeconds}`.padStart(2, '0')}`;
  } else {
    const minutes = Math.trunc(seconds / SECONDS_IN_MINUTE);
    const leftSeconds = Math.trunc(seconds - minutes * SECONDS_IN_MINUTE);
    return `-${`${minutes}`.padStart(2, '0')}:${`${leftSeconds}`.padStart(2, '0')}`;
  }
}
