class BrowserAction {
  public setIcon(detail: chrome.browserAction.TabIconDetails) {
    return new Promise<void>(resolve => {
      chrome.browserAction.setIcon(detail, resolve);
    });
  }

  get onClicked() {
    return chrome.browserAction.onClicked;
  }
}

export default new BrowserAction();
