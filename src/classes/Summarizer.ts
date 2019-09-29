import { Timesheet } from "./Timesheet";

export class Summarizer {
  private timesheet: Timesheet;

  constructor(timeSheet: Timesheet) {
    if (timeSheet === null || timeSheet === undefined) {
      throw new Error("must provide timesheet");
    }
    this.timesheet = timeSheet;
  }
}
