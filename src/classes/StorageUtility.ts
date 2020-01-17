export class StorageUtility {
  private TEST_VALUE: string = "summarizer-ls-test";

  public checkLocalStorageAvailability = (): boolean => {
    try {
      localStorage.setItem(this.TEST_VALUE, this.TEST_VALUE);
      localStorage.removeItem(this.TEST_VALUE);
      return true;
    } catch (e) {
      return false;
    }
  };

  public checkSessionStorageAvailability = (): boolean => {
    try {
      sessionStorage.setItem(this.TEST_VALUE, this.TEST_VALUE);
      sessionStorage.removeItem(this.TEST_VALUE);
      return true;
    } catch (e) {
      return false;
    }
  };
}
