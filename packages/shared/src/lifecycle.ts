export interface IDisposable {
  dispose(): void;
}

export function isDisposable<E extends object>(thing: E): thing is E & IDisposable {
  return typeof (<IDisposable>(<any>thing)).dispose === 'function' && (<IDisposable>(<any>thing)).dispose.length === 0;
}
