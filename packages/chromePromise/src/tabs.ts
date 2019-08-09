class Tabs {
  public getCurrent(): Promise<chrome.tabs.Tab> {
    return new Promise(resolve => {
      chrome.tabs.getCurrent(resolve);
    });
  }

  public sendMessage<T = any>(
    tabId: number,
    message: any,
    options?: chrome.tabs.MessageSendOptions
  ) {
    return new Promise<T>(resolve => {
      if (options) {
        chrome.tabs.sendMessage(tabId, message, options, resolve);
      } else {
        chrome.tabs.sendMessage(tabId, message, resolve);
      }
    });
  }
}

export default new Tabs();
