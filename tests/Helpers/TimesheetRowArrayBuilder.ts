import { DateEntry } from "../../src/classes/DateEntry";
import { ProjectType } from "../../src/classes/ProjectType";
import { TimesheetRow } from "../../src/classes/TimesheetRow";
import { TimesheetRowBuilder } from "../Helpers/TimesheetRowBuilder";

export class TimesheetRowArrayBuilder {
  constructor() {}

  plusHoursForDates = (dates: Array<number>): Array<TimesheetRow> => {
    return this.hoursOfTypeForDates(dates, ProjectType.Bill);
  };

  nonPlusHoursForDates = (dates: Array<number>): Array<TimesheetRow> => {
    return this.hoursOfTypeForDates(dates, ProjectType.NonBillable);
  };

  hoursOfTypeForDates = (
    dates: Array<number>,
    type: ProjectType
  ): Array<TimesheetRow> => {
    var rows = dates.map(theDate =>
      new TimesheetRowBuilder()
        .withProjectType(type)
        .withEntry(new DateEntry(theDate.toString(), "8.0"))
        .build()
    );

    return rows;
  };
}
