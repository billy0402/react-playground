type ExecCommandStyle = {
  style:
    | 'color'
    | 'backgroundColor'
    | 'fontSize'
    | 'fontWeight'
    | 'fontStyle'
    | 'textDecoration';
  value: string;
  initial: (element: HTMLElement | null) => Promise<boolean>;
};

export type { ExecCommandStyle };
