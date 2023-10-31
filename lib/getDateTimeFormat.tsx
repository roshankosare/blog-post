export default function getDateTimeFormat(date: string): string {
  return new Intl.DateTimeFormat("en-us", {year:"2-digit",month:"short",day:"2-digit" }).format(
    new Date(date)
  );
}
