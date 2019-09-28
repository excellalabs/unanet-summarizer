import { DateEntry } from "./DateEntry";
import { PlusProjectTypes } from "./PlusProjectTypes";
import { ProjectType } from "./ProjectType";

export class TimesheetRow {
  public projectType: ProjectType;
  public entries: DateEntry[];

  constructor(projectType: ProjectType, dateEntries: DateEntry[]) {
    this.projectType = projectType;

    if (dateEntries === null || dateEntries === undefined) {
      throw new Error("Entries array must not be null or undefined.");
    } else {
      this.entries = dateEntries;
    }
  }

  public isPlusProjectType(): boolean {
    return Object.values(PlusProjectTypes).includes(this.projectType);
  }

  public totalHours(): number {
    return this.entries.reduce((a, b) => a + b.hoursAmount, 0);
  }
}
