declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}

type Nullable<T> = T | null;
type ReverseMap<T> = T[keyof  T];
