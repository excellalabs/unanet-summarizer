
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
      else{
        this.hoursAmount = Number.parseFloat(hoursAmount.trim());
      }

      this.dayOfMonth = Number.parseInt(dayOfMonth.trim());
    }
  }

  export class TimesheetRow { 
    projectType: ProjectType;
    entries: Array<DateEntry>
  
    constructor(projectType: ProjectType, dateEntries: Array<DateEntry>){
        this.projectType = projectType;
        this.entries = dateEntries;
    }
    
    isPlusProjectType(): boolean {
        return Object.values(PlusProjectTypes).includes(this.projectType);
    };
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
}