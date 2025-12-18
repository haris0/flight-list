export const minutesToHoursAndMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('id-ID', options);
}

export const formatYear = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

