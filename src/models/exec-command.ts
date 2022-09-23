type ExecCommandStyle = {
  value: string;
  initial: (element: HTMLElement | null) => Promise<boolean>;
};

export type { ExecCommandStyle };
