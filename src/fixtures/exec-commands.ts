import { ExecCommandStyle } from '@models/exec-command';

const execCommands: ExecCommandStyle[] = [
  {
    style: 'fontWeight',
    value: 'bold',
    initial: (element: HTMLElement | null) =>
      Promise.resolve(!!element && element.style['fontWeight'] === 'bold'),
  },
  //   {
  //     style: this.action,
  //     value: $event.detail.hex, // The result of our color picker
  //     initial: (element: HTMLElement | null) => {
  //       return new Promise<boolean>(async (resolve) => {
  //         const rgb: string = await hexToRgb($event.detail.hex);
  //         resolve(element && (element.style[this.action] ===
  //                 $event.detail.hex ||
  //                 element.style[this.action] === `rgb(${rgb})`));
  //     });
  //   }
];

export { execCommands };
