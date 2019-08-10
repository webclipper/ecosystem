class Runtime {
  get getManifest() {
    return chrome.runtime.getManifest;
  }

  get lastError() {
    return chrome.runtime.lastError;
  }

  get onMessage() {
    return chrome.runtime.onMessage;
  }
}

export default new Runtime();
