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
        var parsedHours: number = Number.parseFloat(hoursAmount.trim());
        if (Number.isNaN(parsedHours)) {
          throw new Error(
            `Unable to parse a valid hours amount for dayOfMonth: '${dayOfMonth}'`
          );
        } else {
          this.hoursAmount = parsedHours;
        }
      }

      var parsedDayOfMonth: number = Number.parseInt(dayOfMonth.trim(), 10);
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
    HOURS_IN_WORKDAY = 8;

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

    totalUpFilteredRows = (filteredRows: Array<TimesheetRow>): number => {
      if (filteredRows.length === 0) {
        return 0;
      }

      var allHours = filteredRows.reduce(
        (acc, val) => {
          return acc.concat(val.entries.map(entry => entry.hoursAmount));
        },
        [0]
      );

      return allHours.reduce((acc, val) => (acc += val));
    };

    totalPlusHours = (): number => {
      var allPlusHoursRows = this.timesheetRows.filter(val =>
        val.isPlusProjectType()
      );

      return this.totalUpFilteredRows(allPlusHoursRows);
    };

    totalNonPlusHours = (): number => {
      var allNonPlusHoursRows = this.timesheetRows.filter(
        val => !val.isPlusProjectType()
      );

      return this.totalUpFilteredRows(allNonPlusHoursRows);
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

    plusHoursTracking = (): number => {
      var workingDays = this.weekdaysInTimesheet();
      var remainingWorkingDays = this.numberOfRemainingWorkDays();
      var expectedHours = workingDays * this.HOURS_IN_WORKDAY;
      var actualHours =
        this.totalPlusHours() + remainingWorkingDays * this.HOURS_IN_WORKDAY;

      return actualHours - expectedHours;
    };

    numberOfRemainingWorkDays = (): number => {
      var workingDaysLeft = this.weekDaysBetweenDates(
        this.todaysDate,
        this.timesheetEndDate
      );
      if (this.hoursForDate(this.todaysDate.date()) > 0) {
        workingDaysLeft--;
      }

      return workingDaysLeft;
    };

    weekdaysInTimesheet = (): number => {
      return this.weekDaysBetweenDates(
        this.timesheetStartDate,
        this.timesheetEndDate
      );
    };

    hoursForDate = (theDate: number): number => {
      var allEntryArrays = this.timesheetRows.map(row => row.entries);
      var flattenedArray = ([] as DateEntry[]).concat(...allEntryArrays);

      var filteredToTheDate = flattenedArray.filter(value => {
        return value.dayOfMonth === theDate;
      });

      var sumOfHours = filteredToTheDate.reduce((acc, val) => {
        return acc + val.hoursAmount;
      }, 0);
      return sumOfHours;
    };

    weekDaysBetweenDates = (
      theStartDate: moment.Moment,
      endDate: moment.Moment
    ): number => {
      var totalWeekDays = 0;
      var startDate = theStartDate.clone();
      while (startDate <= endDate) {
        if (
          startDate.format("ddd") !== "Sat" &&
          startDate.format("ddd") !== "Sun"
        ) {
          totalWeekDays++; //add 1 to your counter if its not a weekend day
        }

        startDate.add(1, "day");
      }
      return totalWeekDays;
    };

    hoursByProjectType = () => {
      let results: Array<{
        projectType: Summarizer.ProjectType;
        total: number;
      }> = [];

      Object.keys(ProjectType).forEach(key => {
        var keyAsEnum = ProjectType[key as keyof typeof ProjectType];

        var filteredToProjectType = this.timesheetRows.filter(
          val => val.projectType === keyAsEnum
        );

        var theTotal = this.totalUpFilteredRows(filteredToProjectType);
        results.push({
          projectType: keyAsEnum,
          total: theTotal
        });
      });

      return results;
    };
  }

  enum TimesheetDateType {
    Start = "timesheet start date",
    End = "timesheet end date",
    Today = "today's date"
  }
}
