/* eslint-disable no-dupe-class-members */
import { Event } from './event';
import { isUndefinedOrNull } from './types';
import { generateUuid } from './uuid';

export interface IStorageService {
  readonly onDidChangeStorage: Event<string>;

  init(): Promise<void>;

  get(key: string, fallbackValue: string): string;
  get(key: string, fallbackValue?: string): string | undefined;

  getBoolean(key: string, fallbackValue: boolean): boolean;
  getBoolean(key: string, fallbackValue?: boolean): boolean | undefined;

  getNumber(key: string, fallbackValue: number): number;
  getNumber(key: string, fallbackValue?: number): number | undefined;

  set(key: string, value: string | boolean | number | undefined | null): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface IPromiseChromeDataBase {
  remove(keys: string | string[]): Promise<void>;
  set(items: Object): Promise<void>;
  get(keys: string | string[] | Object | null): Promise<{ [key: string]: any }>;
}

export type StorageType = 'local' | 'sync';

export abstract class AbstractStorageService implements IStorageService {
  private readonly database: IPromiseChromeDataBase;
  private items: Map<string, string> = new Map<string, string>();
  private changeEvent: chrome.storage.StorageChangedEvent;
  private storageType: StorageType;
  private listeners: Map<string, (key: string) => void> = new Map<string, (key: string) => void>();

  constructor(
    database: IPromiseChromeDataBase,
    changeEvent: chrome.storage.StorageChangedEvent,
    storageType: StorageType
  ) {
    this.database = database;
    this.changeEvent = changeEvent;
    this.storageType = storageType;
    const eventListener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === this.storageType) {
        const keys = Object.keys(changes);
        keys.forEach(key => {
          const value = changes[key];
          this.items.set(key, value.newValue);
          this.listeners.forEach(fun => {
            fun(key);
          });
        });
      }
    };
    this.changeEvent.addListener(eventListener);
  }

  public async init() {
    const initData = (await this.database.get(null)) || {};
    Object.keys(initData).forEach(key => {
      this.items.set(key, initData[key]);
    });
  }

  public onDidChangeStorage(listener: (key: string) => void) {
    const uuid = generateUuid();
    this.listeners.set(uuid, listener);
    return {
      dispose: () => {
        this.listeners.delete(uuid);
      },
    };
  }

  public get(key: string, fallbackValue: string): string;
  public get(key: string, fallbackValue?: string): string | undefined;
  public get(key: string, fallbackValue?: string): string | undefined {
    const value = this.items.get(key);

    if (isUndefinedOrNull(value)) {
      return fallbackValue;
    }

    return value;
  }

  getBoolean(key: string, fallbackValue: boolean): boolean;
  getBoolean(key: string, fallbackValue?: boolean): boolean | undefined;
  getBoolean(key: string, fallbackValue?: boolean): boolean | undefined {
    const value = this.get(key);

    if (isUndefinedOrNull(value)) {
      return fallbackValue;
    }

    return value === 'true';
  }

  getNumber(key: string, fallbackValue: number): number;
  getNumber(key: string, fallbackValue?: number): number | undefined;
  getNumber(key: string, fallbackValue?: number): number | undefined {
    const value = this.get(key);

    if (isUndefinedOrNull(value)) {
      return fallbackValue;
    }

    return parseInt(value, 10);
  }

  delete(key: string): Promise<void> {
    return this.database.remove(key);
  }

  set(key: string, value: string | boolean | number | null | undefined): Promise<void> {
    if (isUndefinedOrNull(value)) {
      return this.delete(key);
    }

    const valueStr = String(value);

    const currentValue = this.items.get(key);
    if (currentValue === valueStr) {
      return Promise.resolve();
    }

    this.items.set(key, valueStr);
    return this.database.set({
      [key]: valueStr,
    });
  }
}
