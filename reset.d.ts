// Do not add any other lines of code to this file!
import "@total-typescript/ts-reset";

interface ReadonlyArray<T> {
  includes(searchElement: any, fromIndex?: number): searchElement is T;
}
