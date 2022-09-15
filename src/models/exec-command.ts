type ExecCommandStyle = {
  style: 'bold';
  initial: (element: HTMLElement | null) => Promise<boolean>;
};

export type { ExecCommandStyle };
