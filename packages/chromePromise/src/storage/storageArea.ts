import { isUndefined } from '@web-clipper/shared/lib/types';

export default class StorageArea {
  private storage: chrome.storage.StorageArea;

  constructor(storage: chrome.storage.StorageArea) {
    this.storage = storage;
  }

  public clear() {
    return new Promise(resolve => {
      this.storage.clear(resolve);
    });
  }

  public set(item: Object) {
    return new Promise(resolve => {
      this.storage.set(item, resolve);
    });
  }
  public remove(keys: string | string[]) {
    return new Promise(resolve => {
      this.storage.remove(keys, resolve);
    });
  }

  public get(keys?: string | string[] | Object | null) {
    return new Promise(resolve => {
      if (isUndefined(keys)) {
        this.storage.get(resolve);
      } else {
        this.storage.get(keys, resolve);
      }
    });
  }

  public getBytesInUse(keys?: string | string[] | null) {
    return new Promise(resolve => {
      if (isUndefined(keys)) {
        this.storage.getBytesInUse(resolve);
      } else {
        this.storage.getBytesInUse(keys, resolve);
      }
    });
  }
}
