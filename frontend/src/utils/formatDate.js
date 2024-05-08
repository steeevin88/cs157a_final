export function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const formattedMonth = (month + 1).toString().padStart(2, "0");

  return `${formattedMonth}/${day}/${year}`;
}
