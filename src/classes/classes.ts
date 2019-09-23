export module Summarizer {
  export class DateEntry {
    date: Date;
    hoursAmount: number;
  }

  export class TimesheetRow { 
    projectType: ProjectType;
    entries: Array<DateEntry>
  
    constructor(projectType: ProjectType, dateEntries: Array<DateEntry>){
        this.projectType = projectType;
        this.entries = dateEntries;
    }
    
    isPlusProjectType(): boolean {
        return Object.values(BillableProjectTypes).includes(this.projectType);
    };
  }

  export enum ProjectType { 
    Bill = "CLI-BILL+",
    Core = "EXC-CORE+",
    Bench = "EXC-BENCH+",
    Internal = "EXC-INT",
    NonBillable = "CLI-NB"
  }

  export enum BillableProjectTypes {
    Bill = ProjectType.Bill,
    Core = ProjectType.Core,
    Bench = ProjectType.Bench
  }

}