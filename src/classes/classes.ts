import { stringify } from "querystring";

export module Summarizer {
  export class DateEntry {
    date: Date;
    hoursAmount: number;

    constructor(date: string, hoursAmount: string){
      if (hoursAmount === undefined || hoursAmount === null || hoursAmount.trim().length === 0){
        this.hoursAmount = 0;
      }
      else{
        this.hoursAmount = Number.parseFloat(hoursAmount.trim());
      }
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

  export enum NonBillableProductTypes {
    Internal = ProjectType.Internal,
    NonBillable = ProjectType.NonBillable
  }

}