import { EditModeLoader } from "./Loaders/EditModeLoader";
import { ITimesheetLoader } from "./Loaders/ITimesheetLoader";
import { ReviewModeLoader } from "./Loaders/ReviewModeLoader";
import { StorageUtility } from "./StorageUtility";
import { Timesheet } from "./Timesheet";
import { TimesheetMode } from "./TimesheetMode";

export class Summarizer {
  public loader: ITimesheetLoader;
  public timesheetMode: TimesheetMode;
  public timesheet: Timesheet;
  public priorPeriodAmount: number;
  private timesheetTable: Element;
  private title: string;
  private isLocalStorageAvailable: boolean;
  private isSessionStorageAvailable: boolean;

  constructor(url: string, title: string, timesheetTable: Element) {
    const storageUtility = new StorageUtility();
    this.isLocalStorageAvailable = storageUtility.checkLocalStorageAvailability();
    this.isSessionStorageAvailable = storageUtility.checkSessionStorageAvailability();
    this.title = title;
    this.timesheetTable = timesheetTable;
    this.priorPeriodAmount = this.getPriorOverUnder();

    const isViewMode = url.toString().indexOf("time/view") > -1;
    this.timesheetMode = isViewMode ? TimesheetMode.View : TimesheetMode.Edit;

    this.loader = this.getLoader();
    this.timesheet = this.loader.getTimesheet();
  }

  public savePriorPeriodOverUnder = (): void => {
    console.log("summarizer savePriorPeriodOverUnder()");
    const overUnderTextBox: HTMLInputElement = document.getElementById("priorPeriodOverUnder") as HTMLInputElement;
    const key = this.getStorageKey();
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, overUnderTextBox.value);
    } else {
      if (this.isSessionStorageAvailable) {
        sessionStorage.setItem(key, overUnderTextBox.value);
      }
    }
  };

  private getStorageKey = (): string => {
    const timesheetKey = new URLSearchParams(document.location.search).get("timesheetkey");
    const storageKey = timesheetKey ?? new Date().toISOString();

    return `summarizer-${storageKey}`;
  };

  private getPriorOverUnder = (): number => {
    const storageKey = this.getStorageKey();

    const valueRetrievedFromStorage: string = localStorage.getItem(storageKey) ?? sessionStorage.getItem(storageKey);

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
