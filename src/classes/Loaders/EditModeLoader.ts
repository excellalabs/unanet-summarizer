import moment = require("moment");
import { DateEntry } from "../DateEntry";
import { ProjectType } from "../ProjectType";
import { Timesheet } from "../Timesheet";
import { TimesheetRow } from "../TimesheetRow";
import { ITimesheetLoader } from "./ITimesheetLoader";

export class EditModeLoader implements ITimesheetLoader {
  private pageTitle: string;
  private startDateString: string;
  private endDateString: string;
  private todayDate: moment.Moment;
  private timesheetTable: Element;

  constructor(pageTitle: string, timesheetTable: Element) {
    this.pageTitle = pageTitle;
    this.todayDate = moment().startOf("day");
    this.timesheetTable = timesheetTable;
    this.parseTimesheetDateStrings(this.pageTitle);
  }

  public getTimesheet = (): Timesheet => {
    const timesheetRows = this.parseTimesheetRows(this.timesheetTable);
    return new Timesheet(timesheetRows, this.startDateString, this.endDateString, this.todayDate.format("YYYY-MM-DD"));
  };

  private parseTimesheetDateStrings = (titleString: string): void => {
    const betweenParentheses = titleString.substring(titleString.lastIndexOf("(") + 1, titleString.lastIndexOf(")"));
    const splitArray = betweenParentheses.split(" - ");
    this.startDateString = splitArray[0];
    this.endDateString = splitArray[1];
  };

  private parseTimesheetRows = (timesheetTable: Element): TimesheetRow[] => {
    const dateHeaderCells = this.toArray(timesheetTable.querySelectorAll("thead > tr > td.hours-weekday > span.dom, thead > tr > td.hours-weekend > span.dom"));

    const arrayOfDates = dateHeaderCells.map(x => x.textContent);

    const rows = timesheetTable.querySelectorAll("tbody > tr");

    const result = new Array<TimesheetRow>();

    rows.forEach((row: Element) => {
      if (row !== null && row !== undefined) {
        const entries = new Array<DateEntry>();

        const projectTypeElement: HTMLInputElement = row.querySelector("td.project-type > input");

        if (projectTypeElement !== null && projectTypeElement !== undefined) {
          const projectType = projectTypeElement.value;

          if (projectType !== null && projectType !== undefined && projectType.trim().length > 0) {
            const entryCells: HTMLInputElement[] = this.toInputArray(row.querySelectorAll("td.weekday-hours > input, td.weekend-hours > input"));

            entryCells.forEach((cell, index) => {
              const newEntry = new DateEntry(arrayOfDates[index], cell.value);
              entries.push(newEntry);
            });

            const matchingEnumObj = Object.values(ProjectType).find(x => x.valueOf() === projectType);
            result.push(new TimesheetRow(matchingEnumObj, entries));
          }
        }
      }
    });

    return result;
  };

  private toInputArray = (nodeList: NodeList): HTMLInputElement[] => {
    return [].slice.call(nodeList);
  };

  private toArray = (nodeList: NodeList): Node[] => {
    return [].slice.call(nodeList);
  };
}
