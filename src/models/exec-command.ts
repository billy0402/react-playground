type ExecCommandStyle = {
  value: 'bold';
  initial: (element: HTMLElement | null) => Promise<boolean>;
};

export type { ExecCommandStyle };
