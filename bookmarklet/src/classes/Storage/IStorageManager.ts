export interface IStorageManager {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
}
