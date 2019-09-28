import moment = require("moment");
import { DateEntry } from "../DateEntry";
import { ProjectType } from "../ProjectType";
import { Timesheet } from "../Timesheet";
import { TimesheetRow } from "../TimesheetRow";

export class EditModeLoader {
  private pageTitle: string;
  private startDateString: string;
  private endDateString: string;
  private todayDate: moment.Moment;

  constructor(pageTitle: string) {
    this.pageTitle = pageTitle;
    this.parseTimesheetDateStrings(pageTitle);
    this.todayDate = moment();
  }

  public getTimesheet = (): Timesheet => {
    const doesntMatterForNow = new Array<TimesheetRow>(); // TODO: this will matter when we're done.
    doesntMatterForNow.push(new TimesheetRow(ProjectType.Bench, new Array<DateEntry>()));
    return new Timesheet(doesntMatterForNow, this.startDateString, this.endDateString, this.todayDate.format("YYYY-MM-DD"));
  };

  private parseTimesheetDateStrings = (titleString: string): void => {
    const betweenParentheses = titleString.substring(titleString.lastIndexOf("(") + 1, titleString.lastIndexOf(")"));
    const splitArray = betweenParentheses.split(" - ");
    this.startDateString = splitArray[0];
    this.endDateString = splitArray[1];
  };
}
