const HOUR_MINUTES_COUNT = 60;

export function getRunTime(runTime: number){
  const hours = Math.floor(runTime / HOUR_MINUTES_COUNT);
  const minutes = runTime - hours * HOUR_MINUTES_COUNT;
  return `${hours}h ${minutes}m`;
}
