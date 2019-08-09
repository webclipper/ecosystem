class Runtime {
  public getManifest() {
    return chrome.runtime.getManifest();
  }

  get lastError() {
    return chrome.runtime.lastError;
  }
}

export default new Runtime();
