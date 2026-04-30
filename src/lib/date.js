export function getTodayString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatJapaneseDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return `${month}/${day}（${weekdays[date.getDay()]}）`;
}

export function addDays(dateString, amount) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + amount);

  return getTodayString(date);
}

export function sortByDateDesc(a, b) {
  return b.date.localeCompare(a.date);
}
