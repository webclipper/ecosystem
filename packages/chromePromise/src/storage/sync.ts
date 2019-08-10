import StorageArea from './storageArea';

class SyncStorageArea extends StorageArea {
  private sync: chrome.storage.SyncStorageArea;

  constructor(sync: chrome.storage.SyncStorageArea) {
    super(sync);
    this.sync = sync;
  }

  get MAX_ITEMS() {
    return this.sync.MAX_ITEMS;
  }
  get MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE() {
    return this.sync.MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE;
  }
  get MAX_WRITE_OPERATIONS_PER_HOUR() {
    return this.sync.MAX_WRITE_OPERATIONS_PER_HOUR;
  }
  get MAX_WRITE_OPERATIONS_PER_MINUTE() {
    return this.sync.MAX_WRITE_OPERATIONS_PER_MINUTE;
  }
  get QUOTA_BYTES() {
    return this.sync.QUOTA_BYTES;
  }
  get QUOTA_BYTES_PER_ITEM() {
    return this.sync.QUOTA_BYTES_PER_ITEM;
  }
}

export default SyncStorageArea;
