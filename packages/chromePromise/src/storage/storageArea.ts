import { isUndefined } from '@web-clipper/shared/lib/types';

export default class StorageArea {
  private storage: chrome.storage.StorageArea;

  constructor(storage: chrome.storage.StorageArea) {
    this.storage = storage;
  }

  public clear = () => {
    return new Promise((resolve, reject) => {
      this.storage.clear(() => {
        let err = chrome.runtime.lastError;
        if (chrome.runtime.lastError) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  public set = (item: Object) => {
    return new Promise<void>((resolve, reject) => {
      this.storage.set(item, () => {
        let err = chrome.runtime.lastError;
        if (chrome.runtime.lastError) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  public remove = (keys: string | string[]) => {
    return new Promise<void>((resolve) => {
      this.storage.remove(keys, resolve);
    });
  };

  public get = (keys?: string | string[] | Object | null) => {
    return new Promise<{ [key: string]: any }>((resolve, reject) => {
      if (isUndefined(keys)) {
        this.storage.get((items) => {
          let err = chrome.runtime.lastError;
          if (chrome.runtime.lastError) {
            reject(err);
          } else {
            resolve(items);
          }
        });
        return;
      }

      this.storage.get(keys, (items) => {
        let err = chrome.runtime.lastError;
        if (chrome.runtime.lastError) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  };

  public getBytesInUse = (keys?: string | string[] | null) => {
    return new Promise<number>((resolve) => {
      if (isUndefined(keys)) {
        this.storage.getBytesInUse(resolve);
      } else {
        this.storage.getBytesInUse(keys, resolve);
      }
    });
  };
}
