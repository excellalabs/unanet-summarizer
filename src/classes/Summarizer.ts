import { EditModeLoader } from "./Loaders/EditModeLoader";
import { ITimesheetLoader } from "./Loaders/ITimesheetLoader";
import { ReviewModeLoader } from "./Loaders/ReviewModeLoader";
import { Timesheet } from "./Timesheet";
import { TimesheetMode } from "./TimesheetMode";

export class Summarizer {
  public loader: ITimesheetLoader;
  public timesheetMode: TimesheetMode;
  public timesheet: Timesheet;
  public priorPeriodAmount: number;
  private timesheetTable: Element;
  private title: string;

  constructor(url: string, title: string, timesheetTable: Element) {
    this.title = title;
    this.timesheetTable = timesheetTable;
    this.priorPeriodAmount = this.getPriorOverUnder();

    const isViewMode = url.toString().indexOf("time/view") > -1;
    this.timesheetMode = isViewMode ? TimesheetMode.View : TimesheetMode.Edit;

    this.loader = this.getLoader();
    this.timesheet = this.loader.getTimesheet();
  }

  private getPriorOverUnder = (): number => {
    const itemBySheetId: string = "summarizer-47129";
    const itemByDate: string = "summarizer-2020-01-17";

    const thing: string = localStorage.getItem(itemBySheetId) ?? localStorage.getItem(itemByDate) ?? sessionStorage.getItem(itemBySheetId) ?? sessionStorage.getItem(itemByDate);

    if (thing && thing.length > 0) {
      const parsedAmount: number = Number.parseInt(thing, 10);
      return parsedAmount;
    }

    return 0;
  };

  private getLoader = (): ITimesheetLoader => {
    if (this.timesheetMode === TimesheetMode.Edit) {
      return new EditModeLoader(this.title, this.timesheetTable);
    } else {
      return new ReviewModeLoader(this.title, this.timesheetTable);
    }
  };
}
