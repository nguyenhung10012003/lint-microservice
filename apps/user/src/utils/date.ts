export function isValidDate(d: any) {
  return !isNaN(d) && d instanceof Date;
}
