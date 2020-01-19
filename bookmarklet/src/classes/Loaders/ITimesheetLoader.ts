import { Timesheet } from "../Timesheet";

export interface ITimesheetLoader {
  getTimesheet(): Timesheet;
}
