type ExecCommandStyle = {
  cmd: 'style' | 'link';
  value: string;
  initial: (element: HTMLElement | null) => Promise<boolean>;
};

export type { ExecCommandStyle };
