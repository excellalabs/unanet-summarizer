import * as moment from 'moment';
export module Summarizer {
  export class DateEntry {
    dayOfMonth: number;
    hoursAmount: number;

    constructor(dayOfMonth: string, hoursAmount: string){
      if (dayOfMonth === null || dayOfMonth === undefined || dayOfMonth.trim().length === 0){
        throw new Error("Day of month is null or empty. Valid day of the month must be provided.");
      }

      if (hoursAmount === undefined || hoursAmount === null || hoursAmount.trim().length === 0){
        this.hoursAmount = 0;
      }
      else {
        var parsedHours = Number.parseFloat(hoursAmount.trim());
        if (Number.isNaN(parsedHours)){
          throw new Error(`Unable to parse a valid hours amount for dayOfMonth: '${dayOfMonth}'`);
        }
        
        else{
          this.hoursAmount = parsedHours;
        }
      }

      var parsedDayOfMonth = Number.parseInt(dayOfMonth.trim());
      if (Number.isNaN(parsedDayOfMonth)) {
        throw new Error(`Unable to parse dayOfMonth: input was '${dayOfMonth}'`);
      }
      else {
        this.dayOfMonth = parsedDayOfMonth;
      }
    }
  }

  export class TimesheetRow { 
    projectType: ProjectType;
    entries: Array<DateEntry>
  
    constructor(projectType: ProjectType, dateEntries: Array<DateEntry>) {
        this.projectType = projectType;

        if (dateEntries === null || dateEntries === undefined){
          throw new Error("Entries array must not be null or undefined.");
        }
        else{
         this.entries = dateEntries;
        }
    }
    
    isPlusProjectType(): boolean {
        return Object.values(PlusProjectTypes).includes(this.projectType);
    };

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
    timesheetRows: Array<Summarizer.TimesheetRow>
    timesheetStartDate: moment.Moment;

    constructor(timesheetRows: Array<Summarizer.TimesheetRow>, timesheetStartDate: string){
      this.validateTimesheetRows(timesheetRows);

      this.timesheetRows = timesheetRows;

      var momentFormattedDate = this.validateTimesheetStartDate(timesheetStartDate);

      this.timesheetStartDate = momentFormattedDate;

    }


    validateTimesheetRows = function(timesheetRows: Array<Summarizer.TimesheetRow>){
      if(timesheetRows === null || timesheetRows === undefined){
        throw new Error("Must supply a timesheet rows list.");
      }
      if (timesheetRows.length === 0){
        throw new Error("timesheet rows list is empty.");
      }
    }

    validateTimesheetStartDate = function (timesheetStartDate: string): moment.Moment {
      if(timesheetStartDate === null || timesheetStartDate === undefined || timesheetStartDate.trim().length === 0){
        throw new Error("timesheet start date is invalid.");
      }

      var date = moment(timesheetStartDate);

      if (!date.isValid()){
        throw new Error("timesheet start date is invalid.");
      }

      if(date.year() < 2010){
        throw new Error("timesheet start date should be after 2009.");
      }

      return date;
    }
  }
}