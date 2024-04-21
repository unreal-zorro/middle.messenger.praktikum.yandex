type Nullable<T> = T | null;
type ReverseMap<T> = T[keyof T];
type PlainObject<T = unknown> = {
  [k in string]: T;
};
type Indexed<T = unknown> = {
  [key in string]: T;
};
