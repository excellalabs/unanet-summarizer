import * as moment from "moment";
import { DateEntry } from "./DateEntry";
import { ProjectType } from "./ProjectType";
import { TimesheetDateType } from "./TimesheetDateType";
import { TimesheetRow } from "./TimesheetRow";

export class Timesheet {
  public timesheetStartDate: moment.Moment;
  public timesheetEndDate: moment.Moment;
  public todaysDate: moment.Moment;
  private timesheetRows: TimesheetRow[];
  private HOURS_IN_WORKDAY = 8;

  constructor(timesheetRows: TimesheetRow[], timesheetStartDate: string, timesheetEndDate: string, todaysDate: string) {
    this.validateTimesheetRows(timesheetRows);

    this.timesheetRows = timesheetRows;

    const momentStartDate: moment.Moment = this.validateTimesheetDate(timesheetStartDate, TimesheetDateType.Start);
    this.timesheetStartDate = momentStartDate;

    const momentEndDate: moment.Moment = this.validateTimesheetDate(timesheetEndDate, TimesheetDateType.End);
    this.timesheetEndDate = momentEndDate;

    const momentTodayDate: moment.Moment = this.validateTimesheetDate(todaysDate, TimesheetDateType.Today);
    this.todaysDate = momentTodayDate;
  }

  public getLatestEntryDate = (): number => {
    const allDatesThatHaveMoreThanZeroHours: number[] = this.timesheetRows.reduce((acc, val) => {
      // outer reducer, for timesheet rows
      return acc.concat(
        val.entries.reduce((acc2, val2) => {
          // inner reducer, for the date entries on a given row
          if (val2.hoursAmount > 0) {
            // we only care if there are more than 0 hours for the entry.
            return acc.concat(val2.dayOfMonth);
          } else {
            return acc2;
          }
        }, [])
      );
    }, []);

    if (allDatesThatHaveMoreThanZeroHours.length > 0) {
      return Math.max(...allDatesThatHaveMoreThanZeroHours);
    } else {
      return undefined;
    }
  };

  public totalPlusHours = (): number => {
    const allPlusHoursRows: TimesheetRow[] = this.timesheetRows.filter(val => val.isPlusProjectType());

    return this.totalUpFilteredRows(allPlusHoursRows);
  };

  public totalNonPlusHours = (): number => {
    const allNonPlusHoursRows: TimesheetRow[] = this.timesheetRows.filter(val => !val.isPlusProjectType());

    return this.totalUpFilteredRows(allNonPlusHoursRows);
  };

  public expectedPlusHours = (): number => {
    return this.weekdaysInTimesheet() * this.HOURS_IN_WORKDAY;
  };

  public plusHoursTracking = (): number => {
    const remainingWorkingDays: number = this.numberOfRemainingWorkDays();
    const actualHours: number = this.totalPlusHours() + remainingWorkingDays * this.HOURS_IN_WORKDAY;
    return actualHours - this.expectedPlusHours();
  };

  public hoursByProjectType = () => {
    const results: Array<{ projectType: ProjectType; total: number }> = [];

    Object.keys(ProjectType).forEach(key => {
      const keyAsEnum: ProjectType = ProjectType[key as keyof typeof ProjectType];

      const filteredToProjectType: TimesheetRow[] = this.timesheetRows.filter(val => val.projectType === keyAsEnum);

      const theTotal: number = this.totalUpFilteredRows(filteredToProjectType);
      results.push({ projectType: keyAsEnum, total: theTotal });
    });

    return results;
  };

  public weekdaysInTimesheet = (): number => {
    return this.weekDaysBetweenDates(this.timesheetStartDate, this.timesheetEndDate);
  };

  public numberOfRemainingWorkDays = (): number => {
    let workingDaysLeft: number = this.weekDaysBetweenDates(this.todaysDate, this.timesheetEndDate);
    if (workingDaysLeft === 0) {
      return 0;
    }
    if (this.hoursForDate(this.todaysDate.date()) > 0 && this.isWeekday(this.todaysDate)) {
      workingDaysLeft--;
    }

    return workingDaysLeft;
  };

  public hoursForDate = (theDate: number): number => {
    const allEntryArrays: DateEntry[][] = this.timesheetRows.map(row => row.entries);
    const flattenedArray: DateEntry[] = ([] as DateEntry[]).concat(...allEntryArrays);

    const filteredToTheDate: DateEntry[] = flattenedArray.filter(value => {
      return value.dayOfMonth === theDate;
    });

    const sumOfHours: number = filteredToTheDate.reduce((acc, val) => {
      return acc + val.hoursAmount;
    }, 0);
    return sumOfHours;
  };

  private isWeekday = (theDate: moment.Moment): boolean => {
    const formattedDate = theDate.format("ddd").toLowerCase();
    return formattedDate !== "sat" && formattedDate !== "sun";
  };

  private weekDaysBetweenDates = (theStartDate: moment.Moment, theEndDate: moment.Moment): number => {
    let totalWeekDays: number = 0;
    const startDate: moment.Moment = theStartDate.clone().startOf("day");
    const endDate: moment.Moment = theEndDate.clone().startOf("day");
    while (startDate <= endDate) {
      if (this.isWeekday(startDate)) {
        totalWeekDays++; // add 1 to your counter if its not a weekend day
      }

      startDate.add(1, "day");
    }
    return totalWeekDays;
  };

  private totalUpFilteredRows = (filteredRows: TimesheetRow[]): number => {
    if (filteredRows.length === 0) {
      return 0;
    }

    const allHours: number[] = filteredRows.reduce(
      (acc, val) => {
        return acc.concat(val.entries.map(entry => entry.hoursAmount));
      },
      [0]
    );

    return allHours.reduce((acc, val) => (acc += val));
  };
  private validateTimesheetRows = (timesheetRows: TimesheetRow[]) => {
    if (timesheetRows === null || timesheetRows === undefined) {
      throw new Error("Must supply a timesheet rows list.");
    }
    if (timesheetRows.length === 0) {
      throw new Error("timesheet rows list is empty.");
    }
  };

  private validateTimesheetDate = (timesheetStartDate: string, type: TimesheetDateType) => {
    if (timesheetStartDate === null || timesheetStartDate === undefined || timesheetStartDate.trim().length === 0) {
      throw new Error(`${type} is invalid.`);
    }

    const date: moment.Moment = moment(timesheetStartDate).startOf("day");

    if (!date.isValid()) {
      throw new Error(`${type} is invalid.`);
    }

    if (date.year() < 2010) {
      throw new Error(`${type} should be after 2009.`);
    }

    return date;
  };
}
