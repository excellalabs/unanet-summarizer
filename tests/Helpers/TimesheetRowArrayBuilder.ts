import { DateEntry } from "../../src/classes/DateEntry";
import { ProjectType } from "../../src/classes/ProjectType";
import { TimesheetRow } from "../../src/classes/TimesheetRow";
import { TimesheetRowBuilder } from "../Helpers/TimesheetRowBuilder";

export class TimesheetRowArrayBuilder {
  public plusHoursForDates = (dates: number[]): TimesheetRow[] => {
    return this.hoursOfTypeForDates(dates, ProjectType.Bill);
  };

  public nonPlusHoursForDates = (dates: number[]): TimesheetRow[] => {
    return this.hoursOfTypeForDates(dates, ProjectType.NonBillable);
  };

  public hoursOfTypeForDates = (
    dates: number[],
    type: ProjectType
  ): TimesheetRow[] => {
    const rows = dates.map(theDate =>
      new TimesheetRowBuilder()
        .withProjectType(type)
        .withEntry(new DateEntry(theDate.toString(), "8.0"))
        .build()
    );

    return rows;
  };
}
