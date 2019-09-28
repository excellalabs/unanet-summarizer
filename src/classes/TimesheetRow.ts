import { DateEntry } from "./DateEntry";
import { PlusProjectTypes } from "./PlusProjectTypes";
import { ProjectType } from "./ProjectType";

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
