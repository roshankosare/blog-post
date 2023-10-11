export default function getDateTimeFormat(date: string): string {
  return new Intl.DateTimeFormat("en-us", { dateStyle: "long" }).format(
    new Date(date)
  );
}
