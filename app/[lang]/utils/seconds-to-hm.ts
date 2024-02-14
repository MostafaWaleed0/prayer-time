export const secondsToHm = (totalSeconds: number) => {
  totalSeconds = Number(totalSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const shortHour = hours % 12 ?? 12;

  const timeDisplay = `${shortHour < 10 ? `0${shortHour}` : `${shortHour}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`} ${
    hours <= 12 ? 'AM' : 'PM'
  }`;

  return timeDisplay;
};
