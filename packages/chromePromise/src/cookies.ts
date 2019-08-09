class Cookies {
  public get(details: chrome.cookies.Details): Promise<chrome.cookies.Cookie | null> {
    return new Promise(resolve => {
      chrome.cookies.get(details, resolve);
    });
  }
}

export default new Cookies();
