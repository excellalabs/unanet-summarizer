import { IStorageManager } from "./IStorageManager";

export class StubStorageManager implements IStorageManager {
  public getItem = (key: string): string => {
    return "";
  };

  public setItem = (key: string, value: string): void => {
    // do nothing
  };
}
