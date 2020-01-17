import { EditModeLoader } from "./Loaders/EditModeLoader";
import { ITimesheetLoader } from "./Loaders/ITimesheetLoader";
import { ReviewModeLoader } from "./Loaders/ReviewModeLoader";
import { IStorageManager } from "./Storage/IStorageManager";
import { Timesheet } from "./Timesheet";
import { TimesheetMode } from "./TimesheetMode";

export class Summarizer {
  public loader: ITimesheetLoader;
  public timesheetMode: TimesheetMode;
  public timesheet: Timesheet;
  public priorPeriodAmount: number;
  private timesheetTable: Element;
  private title: string;
  private storageManager: IStorageManager;
  private theURL: URL;

  constructor(url: string, title: string, timesheetTable: Element, storageManager: IStorageManager) {
    this.storageManager = storageManager;
    this.title = title;
    this.timesheetTable = timesheetTable;
    this.theURL = new URL(url);
    this.priorPeriodAmount = this.getPriorOverUnder();

    const isViewMode = url.toString().indexOf("time/view") > -1;
    this.timesheetMode = isViewMode ? TimesheetMode.View : TimesheetMode.Edit;

    this.loader = this.getLoader();
    this.timesheet = this.loader.getTimesheet();
  }

  public savePriorPeriodOverUnder = (): void => {
    const overUnderTextBox: HTMLInputElement = document.getElementById("priorPeriodOverUnder") as HTMLInputElement;
    const key = this.getStorageKey();

    this.storageManager.setItem(key, overUnderTextBox.value);
  };

  private getStorageKey = (): string => {
    const timesheetKey = new URLSearchParams(this.theURL.search).get("timesheetkey");
    const storageKey = timesheetKey ?? new Date().toISOString();

    return `summarizer-${storageKey}`;
  };

  private getPriorOverUnder = (): number => {
    const storageKey = this.getStorageKey();

    const valueRetrievedFromStorage: string = this.storageManager.getItem(storageKey);

    if (valueRetrievedFromStorage && valueRetrievedFromStorage.length > 0) {
      const parsedAmount: number = Number.parseInt(valueRetrievedFromStorage, 10);
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
