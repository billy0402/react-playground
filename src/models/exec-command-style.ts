type ExecCommandStyle = {
  style:
    | 'color'
    | 'background-color'
    | 'font-size'
    | 'font-weight'
    | 'font-style'
    | 'text-decoration';
  value: string;
  initial: (element: HTMLElement | null) => Promise<boolean>;
};

export type { ExecCommandStyle };
