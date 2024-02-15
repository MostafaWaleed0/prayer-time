export const secondsToHm = (totalSeconds: number): string => {
  totalSeconds = Number(totalSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const shortHour = hours % 12 || 12;

  // Construct time display string
  const formattedHour = shortHour < 10 ? `0${shortHour}` : `${shortHour}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const meridiem = hours < 12 ? 'AM' : 'PM';
  const timeDisplay = `${formattedHour}:${formattedMinutes} ${meridiem}`;

  return timeDisplay;
};
