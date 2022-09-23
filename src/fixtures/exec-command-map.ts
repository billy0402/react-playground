import { ExecCommandStyle } from '@models/exec-command';

const execCommandMap: { [key: string]: ExecCommandStyle } = {
  bold: {
    value: 'bold',
    initial: (element: HTMLElement | null) =>
      Promise.resolve(!!element && element.classList.contains('bold')),
  },
  italic: {
    value: 'italic',
    initial: (element: HTMLElement | null) =>
      Promise.resolve(!!element && element.classList.contains('italic')),
  },
};

export default execCommandMap;
