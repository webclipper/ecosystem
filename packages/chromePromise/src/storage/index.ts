import LocalStorageArea from './local';
import SyncStorageArea from './sync';

class Storage {
  private syncStorageArea?: SyncStorageArea;
  private localStorageArea?: LocalStorageArea;

  get onChanged() {
    return chrome.storage.onChanged;
  }
  get local() {
    if (!this.localStorageArea) {
      this.localStorageArea = new LocalStorageArea(chrome.storage.local);
    }
    return this.localStorageArea;
  }
  get sync() {
    if (!this.syncStorageArea) {
      this.syncStorageArea = new SyncStorageArea(chrome.storage.sync);
    }
    return this.syncStorageArea;
  }
}

export default new Storage();
