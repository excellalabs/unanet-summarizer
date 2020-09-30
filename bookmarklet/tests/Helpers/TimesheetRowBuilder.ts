import "jasmine";
import { DateEntry } from "../../src/classes/DateEntry";
import { ProjectType } from "../../src/classes/ProjectType";
import { TimesheetRow } from "../../src/classes/TimesheetRow";

export class TimesheetRowBuilder {
  private projectType: ProjectType;
  private entries = new Array<DateEntry>();

  public build = () => {
    const objToReturn = new TimesheetRow(this.projectType, this.entries);
    return objToReturn;
  };

  public withEntry = (entry: DateEntry) => {
    this.entries.push(entry);
    return this;
  };

  public withProjectType = (type: ProjectType) => {
    this.projectType = type;
    return this;
  };
}
