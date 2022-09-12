const isContainer = (containers: string, element: Node): boolean => {
  const containerTypes: string[] = containers.toLowerCase().split(',');
  return !!(
    element &&
    element.nodeName &&
    containerTypes.indexOf(element.nodeName.toLowerCase()) > -1
  );
};

export { isContainer };
