import StorageArea from './storageArea';

class LocalStorageArea extends StorageArea {
  private local: chrome.storage.LocalStorageArea;

  constructor(local: chrome.storage.LocalStorageArea) {
    super(local);
    this.local = local;
  }
  get QUOTA_BYTES() {
    return this.local.QUOTA_BYTES;
  }
}

export default LocalStorageArea;
