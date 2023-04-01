// timestamp to date
export function timestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
