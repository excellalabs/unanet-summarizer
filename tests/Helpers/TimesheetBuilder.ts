import { DateEntry } from "../../src/classes/DateEntry";
import { ProjectType } from "../../src/classes/ProjectType";
import { Timesheet } from "../../src/classes/Timesheet";
import { TimesheetRow } from "../../src/classes/TimesheetRow";

export class TimesheetBuilder {
  startDate: string = "2019-09-01";
  endDate: string = "2019-09-15";
  todayDate: string = "2019-09-08";
  rows = new Array<TimesheetRow>();

  constructor() {
    this.rows.push(new TimesheetRow(ProjectType.Bench, new Array<DateEntry>()));
  }

  withStartDate = (theDate: string) => {
    this.startDate = theDate;
    return this;
  };

  withEndDate = (theDate: string) => {
    this.endDate = theDate;
    return this;
  };

  withTodayDate = (theDate: string) => {
    this.todayDate = theDate;
    return this;
  };

  withRows = (theRows: Array<TimesheetRow>) => {
    this.rows = theRows;
    return this;
  };

  build = () => {
    return new Timesheet(
      this.rows,
      this.startDate,
      this.endDate,
      this.todayDate
    );
  };
}
