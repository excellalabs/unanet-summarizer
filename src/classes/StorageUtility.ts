export class StorageUtility {
  public checkLocalStorageAvailability = (): boolean => {
    const testValue = "summarizer-ls-test";

    try {
      localStorage.setItem(testValue, testValue);
      localStorage.removeItem(testValue);
      return true;
    } catch (e) {
      return false;
    }
  };

  public checkSessionStorageAvailability = (): boolean => {
    const testValue = "summarizer-ls-test";

    try {
      sessionStorage.setItem(testValue, testValue);
      sessionStorage.removeItem(testValue);
      return true;
    } catch (e) {
      return false;
    }
  };
}
