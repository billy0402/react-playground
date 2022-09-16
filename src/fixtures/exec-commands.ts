import { ExecCommandStyle } from '@models/exec-command';

const execCommands: ExecCommandStyle[] = [
  {
    cmd: 'style',
    value: 'bold',
    initial: (element: HTMLElement | null) =>
      Promise.resolve(!!element && element.classList.contains('bold')),
  },
  {
    cmd: 'style',
    value: 'italic',
    initial: (element: HTMLElement | null) =>
      Promise.resolve(!!element && element.classList.contains('italic')),
  },
];

export { execCommands };
