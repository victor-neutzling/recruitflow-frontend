export function getDeadlineStatus(isoString: string) {
  if (!isoString) return null;

  const inputDate = new Date(isoString);
  if (Number.isNaN(inputDate.getTime())) return null;

  const now = new Date();

  if (inputDate < now) return "expired";

  const isToday =
    inputDate.getFullYear() === now.getFullYear() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getDate() === now.getDate();

  if (isToday) return "today";

  return "upcoming";
}
