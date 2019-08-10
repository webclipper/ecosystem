import LocalStorageArea from './local';
import SyncStorageArea from './sync';

const local = new LocalStorageArea(chrome.storage.local);
const sync = new SyncStorageArea(chrome.storage.sync);

class Storage {
  get onChanged() {
    return chrome.storage.onChanged;
  }
  get local() {
    return local;
  }
  get sync() {
    return sync;
  }
}

export default new Storage();
