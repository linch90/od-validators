export interface Option<T> {
  key: Extract<keyof T, string>;
  value: T[Extract<keyof T, string>];
}
