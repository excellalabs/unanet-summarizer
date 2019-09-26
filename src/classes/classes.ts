import * as moment from "moment";

export module Summarizer {
  export class DateEntry {
    dayOfMonth: number;
    hoursAmount: number;

    constructor(dayOfMonth: string, hoursAmount: string) {
      if (
        dayOfMonth === null ||
        dayOfMonth === undefined ||
        dayOfMonth.trim().length === 0
      ) {
        throw new Error(
          "Day of month is null or empty. Valid day of the month must be provided."
        );
      }

      if (
        hoursAmount === undefined ||
        hoursAmount === null ||
        hoursAmount.trim().length === 0
      ) {
        this.hoursAmount = 0;
      } else {
        var parsedHours = Number.parseFloat(hoursAmount.trim());
        if (Number.isNaN(parsedHours)) {
          throw new Error(
            `Unable to parse a valid hours amount for dayOfMonth: '${dayOfMonth}'`
          );
        } else {
          this.hoursAmount = parsedHours;
        }
      }

      var parsedDayOfMonth = Number.parseInt(dayOfMonth.trim());
      if (Number.isNaN(parsedDayOfMonth)) {
        throw new Error(
          `Unable to parse dayOfMonth: input was '${dayOfMonth}'`
        );
      } else {
        this.dayOfMonth = parsedDayOfMonth;
      }
    }
  }

  export class TimesheetRow {
    projectType: ProjectType;
    entries: Array<DateEntry>;

    constructor(projectType: ProjectType, dateEntries: Array<DateEntry>) {
      this.projectType = projectType;

      if (dateEntries === null || dateEntries === undefined) {
        throw new Error("Entries array must not be null or undefined.");
      } else {
        this.entries = dateEntries;
      }
    }

    isPlusProjectType(): boolean {
      return Object.values(PlusProjectTypes).includes(this.projectType);
    }

    totalHours(): number {
      return this.entries.reduce((a, b) => a + b.hoursAmount, 0);
    }
  }

  export enum ProjectType {
    Bill = "CLI-BILL+",
    Core = "EXC-CORE+",
    Bench = "EXC-BENCH+",
    Internal = "EXC-INT",
    NonBillable = "CLI-NB"
  }

  export enum PlusProjectTypes {
    Bill = ProjectType.Bill,
    Core = ProjectType.Core,
    Bench = ProjectType.Bench
  }

  export enum NonPlusProjectTypes {
    Internal = ProjectType.Internal,
    NonBillable = ProjectType.NonBillable
  }

  export class Timesheet {
    timesheetRows: Array<Summarizer.TimesheetRow>;
    timesheetStartDate: moment.Moment;
    timesheetEndDate: moment.Moment;
    todaysDate: moment.Moment;

    constructor(
      timesheetRows: Array<Summarizer.TimesheetRow>,
      timesheetStartDate: string,
      timesheetEndDate: string,
      todaysDate: string
    ) {
      this.validateTimesheetRows(timesheetRows);

      this.timesheetRows = timesheetRows;

      var momentStartDate = this.validateTimesheetDate(
        timesheetStartDate,
        TimesheetDateType.Start
      );
      this.timesheetStartDate = momentStartDate;

      var momentEndDate = this.validateTimesheetDate(
        timesheetEndDate,
        TimesheetDateType.End
      );
      this.timesheetEndDate = momentEndDate;

      var momentTodayDate = this.validateTimesheetDate(
        todaysDate,
        TimesheetDateType.Today
      );
      this.todaysDate = momentTodayDate;
    }

    getLatestEntryDate = (): number => {
      var allDatesThatHaveMoreThanZeroHours = this.timesheetRows.reduce(
        (acc, val) => {
          // outer reducer, for timesheet rows
          return acc.concat(
            val.entries.reduce((acc, val) => {
              // inner reducer, for the date entries on a given row
              if (val.hoursAmount > 0) {
                // we only care if there are more than 0 hours for the entry.
                return acc.concat(val.dayOfMonth);
              } else {
                return acc;
              }
            }, [])
          );
        },
        []
      );

      if (allDatesThatHaveMoreThanZeroHours.length > 0) {
        return Math.max(...allDatesThatHaveMoreThanZeroHours);
      } else {
        return undefined;
      }
    };

    validateTimesheetRows = function(
      timesheetRows: Array<Summarizer.TimesheetRow>
    ) {
      if (timesheetRows === null || timesheetRows === undefined) {
        throw new Error("Must supply a timesheet rows list.");
      }
      if (timesheetRows.length === 0) {
        throw new Error("timesheet rows list is empty.");
      }
    };

    validateTimesheetDate = function(
      timesheetStartDate: string,
      type: TimesheetDateType
    ): moment.Moment {
      if (
        timesheetStartDate === null ||
        timesheetStartDate === undefined ||
        timesheetStartDate.trim().length === 0
      ) {
        throw new Error(`${type} is invalid.`);
      }

      var date = moment(timesheetStartDate);

      if (!date.isValid()) {
        throw new Error(`${type} is invalid.`);
      }

      if (date.year() < 2010) {
        throw new Error(`${type} should be after 2009.`);
      }

      return date;
    };
  }

  enum TimesheetDateType {
    Start = "timesheet start date",
    End = "timesheet end date",
    Today = "today's date"
  }
}
