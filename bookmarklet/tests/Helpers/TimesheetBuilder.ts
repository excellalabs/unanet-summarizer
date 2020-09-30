import "jasmine";
import { DateEntry } from "../../src/classes/DateEntry";
import { ProjectType } from "../../src/classes/ProjectType";
import { Timesheet } from "../../src/classes/Timesheet";
import { TimesheetRow } from "../../src/classes/TimesheetRow";

export class TimesheetBuilder {
  private startDate: string = "2019-09-01";
  private endDate: string = "2019-09-15";
  private todayDate: string = "2019-09-08";
  private rows = new Array<TimesheetRow>();

  constructor() {
    this.rows.push(new TimesheetRow(ProjectType.Bench, new Array<DateEntry>()));
  }

  public withStartDate = (theDate: string) => {
    this.startDate = theDate;
    return this;
  };

  public withEndDate = (theDate: string) => {
    this.endDate = theDate;
    return this;
  };

  public withTodayDate = (theDate: string) => {
    this.todayDate = theDate;
    return this;
  };

  public withRows = (theRows: TimesheetRow[]) => {
    this.rows = theRows;
    return this;
  };

  public build = () => {
    return new Timesheet(
      this.rows,
      this.startDate,
      this.endDate,
      this.todayDate
    );
  };
}
