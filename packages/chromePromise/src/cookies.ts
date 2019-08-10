class Cookies {
  public get(details: chrome.cookies.Details): Promise<chrome.cookies.Cookie | null> {
    return new Promise(resolve => {
      chrome.cookies.get(details, resolve);
    });
  }

  public set(details: chrome.cookies.SetDetails): Promise<chrome.cookies.Cookie | null> {
    return new Promise(resolve => {
      chrome.cookies.set(details, resolve);
    });
  }

  public getAll(details: chrome.cookies.GetAllDetails): Promise<chrome.cookies.Cookie[]> {
    return new Promise(resolve => {
      chrome.cookies.getAll(details, resolve);
    });
  }

  public remove(details: chrome.cookies.Details): Promise<chrome.cookies.Details> {
    return new Promise(resolve => {
      chrome.cookies.remove(details, resolve);
    });
  }

  get onChanged() {
    return chrome.cookies.onChanged;
  }
}

export default new Cookies();
