import * as moment from "moment";
import { DateEntry } from "./DateEntry";
import { ProjectType } from "./ProjectType";
import { TimesheetDateType } from "./TimesheetDateType";
import { TimesheetRow } from "./TimesheetRow";

export class Timesheet {
  public timesheetStartDate: moment.Moment;
  public timesheetEndDate: moment.Moment;
  private timesheetRows: TimesheetRow[];
  private todaysDate: moment.Moment;
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

  public plusHoursTracking = (): number => {
    const workingDays: number = this.weekdaysInTimesheet();
    const remainingWorkingDays: number = this.numberOfRemainingWorkDays();
    const expectedHours: number = workingDays * this.HOURS_IN_WORKDAY;
    const actualHours: number = this.totalPlusHours() + remainingWorkingDays * this.HOURS_IN_WORKDAY;

    return actualHours - expectedHours;
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
    if (this.hoursForDate(this.todaysDate.date()) > 0) {
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

  private weekDaysBetweenDates = (theStartDate: moment.Moment, endDate: moment.Moment): number => {
    let totalWeekDays: number = 0;
    const startDate: moment.Moment = theStartDate.clone();
    while (startDate <= endDate) {
      if (startDate.format("ddd") !== "Sat" && startDate.format("ddd") !== "Sun") {
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

    const date: moment.Moment = moment(timesheetStartDate);

    if (!date.isValid()) {
      throw new Error(`${type} is invalid.`);
    }

    if (date.year() < 2010) {
      throw new Error(`${type} should be after 2009.`);
    }

    return date;
  };
}
