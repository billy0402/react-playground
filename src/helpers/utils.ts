const isContainer = (containers: string, element: Node): boolean => {
  const containerTypes: string[] = containers.toLowerCase().split(',');
  return !!(
    element &&
    element.nodeName &&
    containerTypes.indexOf(element.nodeName.toLowerCase()) > -1
  );
};

const findContainer = (
  containers: string,
  element: HTMLElement,
): Promise<HTMLElement> => {
  return new Promise<HTMLElement>(async (resolve) => {
    if (!element) {
      resolve(element);
      return;
    }

    // Just in case
    if (
      element.nodeName.toUpperCase() === 'HTML' ||
      element.nodeName.toUpperCase() === 'BODY' ||
      !element.parentElement
    ) {
      resolve(element);
      return;
    }

    if (isContainer(containers, element)) {
      resolve(element);
    } else {
      const container: HTMLElement = await findContainer(
        containers,
        element.parentElement,
      );

      resolve(container);
    }
  });
};

export { isContainer };
