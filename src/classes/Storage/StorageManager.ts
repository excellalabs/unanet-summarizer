import { IStorageManager } from "./IStorageManager";

export class StorageManager implements IStorageManager {
  private TEST_VALUE: string = "summarizer-ls-test";
  private isLocalAvailable: boolean;
  private isSessionAvailable: boolean;

  constructor() {
    this.isLocalAvailable = this.checkLocalStorageAvailability();
    this.isSessionAvailable = this.checkSessionStorageAvailability();
  }

  public getItem = (key: string): string => {
    return localStorage.getItem(key) ?? sessionStorage.getItem(key);
  };
  public setItem = (key: string, value: string): void => {
    if (this.isLocalAvailable) {
      localStorage.setItem(key, value);
    } else {
      if (this.isSessionAvailable) {
        sessionStorage.setItem(key, value);
      }
    }

    localStorage.setItem(key, value);
  };

  private checkLocalStorageAvailability = (): boolean => {
    try {
      localStorage.setItem(this.TEST_VALUE, this.TEST_VALUE);
      localStorage.removeItem(this.TEST_VALUE);
      return true;
    } catch (e) {
      return false;
    }
  };

  private checkSessionStorageAvailability = (): boolean => {
    try {
      sessionStorage.setItem(this.TEST_VALUE, this.TEST_VALUE);
      sessionStorage.removeItem(this.TEST_VALUE);
      return true;
    } catch (e) {
      return false;
    }
  };
}
