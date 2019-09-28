export class DateEntry {
  public dayOfMonth: number;
  public hoursAmount: number;

  constructor(dayOfMonth: string, hoursAmount: string) {
    if (dayOfMonth === null || dayOfMonth === undefined || dayOfMonth.trim().length === 0) {
      throw new Error("Day of month is null or empty. Valid day of the month must be provided.");
    }

    if (hoursAmount === undefined || hoursAmount === null || hoursAmount.trim().length === 0) {
      this.hoursAmount = 0;
    } else {
      const parsedHours: number = Number.parseFloat(hoursAmount.trim());
      if (Number.isNaN(parsedHours)) {
        throw new Error(`Unable to parse a valid hours amount for dayOfMonth: '${dayOfMonth}'`);
      } else {
        this.hoursAmount = parsedHours;
      }
    }

    const parsedDayOfMonth: number = Number.parseInt(dayOfMonth.trim(), 10);
    if (Number.isNaN(parsedDayOfMonth)) {
      throw new Error(`Unable to parse dayOfMonth: input was '${dayOfMonth}'`);
    } else {
      this.dayOfMonth = parsedDayOfMonth;
    }
  }
}
