import { DateEntry } from "../../src/classes/DateEntry";
import { ProjectType } from "../../src/classes/ProjectType";
import { TimesheetRow } from "../../src/classes/TimesheetRow";

export class TimesheetRowBuilder {
  projectType: ProjectType;
  entries = new Array<DateEntry>();

  build = () => {
    var objToReturn = new TimesheetRow(this.projectType, this.entries);
    return objToReturn;
  };

  withEntry = (entry: DateEntry) => {
    this.entries.push(entry);
    return this;
  };

  withProjectType = (type: ProjectType) => {
    this.projectType = type;
    return this;
  };
}
