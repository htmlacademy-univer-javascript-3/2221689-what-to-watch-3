import { HOUR_MINUTES_COUNT } from '../const';

export function getRunTime(runTime: number){
  const hours = Math.floor(runTime / HOUR_MINUTES_COUNT);
  const minutes = runTime - hours * HOUR_MINUTES_COUNT;
  return `${hours}h ${minutes}m`;
}
