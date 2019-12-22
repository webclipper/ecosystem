class Tabs {
  public getCurrent = (): Promise<chrome.tabs.Tab> => {
    return new Promise(resolve => {
      chrome.tabs.getCurrent(resolve);
    });
  };

  public sendMessage = <T = any>(tabId: number, message: any, options?: chrome.tabs.MessageSendOptions) => {
    return new Promise<T>(resolve => {
      if (options) {
        chrome.tabs.sendMessage(tabId, message, options, resolve);
      } else {
        chrome.tabs.sendMessage(tabId, message, resolve);
      }
    });
  };

  public executeScript = <T extends any[]>(details: chrome.tabs.InjectDetails, tabId?: number): Promise<T> => {
    return new Promise(resolve => {
      if (typeof tabId === 'number') {
        chrome.tabs.executeScript(tabId, details, r => {
          resolve(r as T);
        });
      } else {
        chrome.tabs.executeScript(details, r => {
          resolve(r as T);
        });
      }
    });
  };

  get onUpdated() {
    return chrome.tabs.onUpdated;
  }
  get onCreated() {
    return chrome.tabs.onCreated;
  }
}

export default new Tabs();
