export { cn } from "cn";

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}
