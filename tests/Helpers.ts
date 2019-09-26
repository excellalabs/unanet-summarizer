import { Summarizer } from "../src/classes/classes";
export module Helpers {
  export class TimesheetRowBuilder {
    projectType: Summarizer.ProjectType;
    entries = new Array<Summarizer.DateEntry>();

    build = () => {
      var objToReturn = new Summarizer.TimesheetRow(
        this.projectType,
        this.entries
      );
      return objToReturn;
    };

    withEntry = (entry: Summarizer.DateEntry) => {
      this.entries.push(entry);
      return this;
    };

    withProjectType = (type: Summarizer.ProjectType) => {
      this.projectType = type;
      return this;
    };
  }

  export class TimesheetRowArrayBuilder {
    constructor() {}

    plusHoursForDates = (
      dates: Array<number>
    ): Array<Summarizer.TimesheetRow> => {
      return this.hoursOfTypeForDates(dates, Summarizer.ProjectType.Bill);
    };

    nonPlusHoursForDates = (
      dates: Array<number>
    ): Array<Summarizer.TimesheetRow> => {
      return this.hoursOfTypeForDates(
        dates,
        Summarizer.ProjectType.NonBillable
      );
    };

    hoursOfTypeForDates = (
      dates: Array<number>,
      type: Summarizer.ProjectType
    ): Array<Summarizer.TimesheetRow> => {
      var rows = dates.map(theDate =>
        new TimesheetRowBuilder()
          .withProjectType(type)
          .withEntry(new Summarizer.DateEntry(theDate.toString(), "8.0"))
          .build()
      );

      return rows;
    };
  }

  export class TimesheetBuilder {
    startDate: string = "2019-09-01";
    endDate: string = "2019-09-15";
    todayDate: string = "2019-09-08";
    rows = new Array<Summarizer.TimesheetRow>();

    constructor() {
      this.rows.push(
        new Summarizer.TimesheetRow(
          Summarizer.ProjectType.Bench,
          new Array<Summarizer.DateEntry>()
        )
      );
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

    withRows = (theRows: Array<Summarizer.TimesheetRow>) => {
      this.rows = theRows;
      return this;
    };

    build = () => {
      return new Summarizer.Timesheet(
        this.rows,
        this.startDate,
        this.endDate,
        this.todayDate
      );
    };
  }
}
