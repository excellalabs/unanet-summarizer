import moment = require("moment");
import { DateEntry } from "../DateEntry";
import { ProjectType } from "../ProjectType";
import { Timesheet } from "../Timesheet";
import { TimesheetRow } from "../TimesheetRow";
import { ITimesheetLoader } from "./ITimesheetLoader";

export class ReviewModeLoader implements ITimesheetLoader {
  private pageTitle: string;
  private startDateString: string;
  private endDateString: string;
  private todayDate: moment.Moment;
  private timesheetTable: Element;

  constructor(pageTitle: string, timesheetTable: Element) {
    this.pageTitle = pageTitle;
    this.todayDate = moment().startOf("day");
    this.timesheetTable = timesheetTable;
  }

  public getTimesheet = (): Timesheet => {
    this.parseTimesheetDateStrings(this.pageTitle);
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
    const dateHeaderCells = this.toArray(timesheetTable.querySelectorAll("thead > tr > th.weekday, thead > tr > th.weekend"));
    const arrayOfDates = dateHeaderCells.map(x => {
      const text = x.textContent;
      return text.substr(3, text.length);
    });

    const rows = timesheetTable.querySelectorAll("tbody > tr:not(.row-change)");

    const result = new Array<TimesheetRow>();

    rows.forEach((row: Element) => {
      if (row !== null && row !== undefined) {
        const entries = new Array<DateEntry>();

        const projectTypeElement: HTMLInputElement = row.querySelector(":nth-child(4)");

        if (projectTypeElement !== null && projectTypeElement !== undefined) {
          const projectType = projectTypeElement.textContent;

          if (projectType !== null && projectType !== undefined && projectType.trim().length > 0) {
            const entryCells = this.toArray(row.querySelectorAll("td.weekday, td.weekend"));

            entryCells.forEach((cell, index) => {
              const newEntry = new DateEntry(arrayOfDates[index], cell.textContent);
              entries.push(newEntry);
            });

            const matchingEnumObj = Object.values(ProjectType).find(x => x.valueOf() === projectType);
            const theRow = new TimesheetRow(matchingEnumObj, entries);
            result.push(theRow);
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
