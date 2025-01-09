import dayjs from "dayjs";
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export function formatDate(
  date?: Date,
  format: string = "ddd, MMM DD YYYY (h:mm A)"
): string {
  if (!date) return "";
  return dayjs(date).format(format);
}
