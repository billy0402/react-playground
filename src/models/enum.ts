type Enum = {
  [key: string]: string;
};

type ValueOf<T> = T[keyof T];

export type { Enum, ValueOf };
