import type { ExecCommandStyle } from '@models/exec-command';
import { isContainer } from './exec-command-utils';

const execCommandLink = async (
  action: ExecCommandStyle,
  containers: string,
) => {
  const selection: Selection | null = await getSelection();
  if (!selection) return;

  const anchorNode: Node | null = selection.anchorNode;
  if (!anchorNode) return;

  const container: HTMLElement =
    anchorNode.nodeType !== Node.TEXT_NODE &&
    anchorNode.nodeType !== Node.COMMENT_NODE
      ? (anchorNode as HTMLElement)
      : (anchorNode.parentElement as HTMLElement);

  const sameSelection: boolean =
    container && container.innerText === selection.toString();

  if (
    sameSelection &&
    !isContainer(containers, container) &&
    container.getAttribute('href') === action.value
  ) {
    await updateLink(container, action, containers);
    return;
  }

  await replaceLink(container, action, selection, containers);
};

// 更新選取內容樣式，並清理子層樣式
const updateLink = async (
  container: HTMLElement,
  action: ExecCommandStyle,
  containers: string,
) => {
  const styleValue = await getStyleValue(container, action, containers);
  if (container.classList.contains(styleValue)) {
    container.classList.remove(styleValue);

    if (!container.classList.length) {
      container.replaceWith(...Array.from(container.childNodes));
    }
  } else {
    container.classList.add(styleValue);
  }

  await cleanChildren(action, container);
};

// 取得要更新的樣式
const getStyleValue = async (
  container: HTMLElement,
  action: ExecCommandStyle,
  containers: string,
): Promise<string> => {
  // if (!container) {
  //   return action.style;
  // }

  // if (await action.initial(container)) {
  //   return 'initial';
  // }

  // const style: Node | null = await findStyleNode(
  //   container,
  //   action.style,
  //   containers,
  // );

  // if (await action.initial(style as HTMLElement)) {
  //   return 'initial';
  // }

  return action.value;
};

// 取得更新節點，遞迴父層到 DOM 頂層，尋找是否為繼承樣式
const findStyleNode = async (
  node: Node,
  style: string,
  containers: string,
): Promise<Node | null> => {
  // Just in case
  if (
    node.nodeName.toUpperCase() === 'HTML' ||
    node.nodeName.toUpperCase() === 'BODY'
  ) {
    return null;
  }

  if (!node.parentNode) {
    return null;
  }

  if (isContainer(containers, node)) {
    return null;
  }

  const hasClass = (node as HTMLElement).classList.contains(style);
  if (hasClass) {
    return node;
  }

  return await findStyleNode(node.parentNode, style, containers);
};

// 清理子層樣式，遞迴子層到容器底層
const cleanChildren = async (
  action: ExecCommandStyle,
  span: HTMLSpanElement,
) => {
  if (!span.hasChildNodes()) return;

  // Clean direct (> *) children with same style
  const children: HTMLElement[] = (
    Array.from(span.children) as HTMLElement[]
  ).filter((element: HTMLElement) =>
    element.classList.contains(action.value),
  ) as HTMLElement[];

  if (children && children.length > 0) {
    children.forEach((element: HTMLElement) => {
      element.classList.remove(action.value);

      if (element.getAttribute('class') === '' || !element.classList.length) {
        element.removeAttribute('class');
      }
    });
  }

  // Direct children (> *) may have children (*) to be clean too
  const cleanChildrenChildren: Promise<void>[] = (
    Array.from(span.children) as HTMLElement[]
  ).map((element: HTMLElement) => {
    return cleanChildren(action, element);
  });

  if (!cleanChildrenChildren || cleanChildrenChildren.length <= 0) return;

  await Promise.all(cleanChildrenChildren);
};

// 取代選取內容樣式為 span 包覆的新節點
const replaceLink = async (
  container: HTMLElement,
  action: ExecCommandStyle,
  selection: Selection,
  containers: string,
) => {
  const range: Range = selection.getRangeAt(0);

  const fragment: DocumentFragment = range.extractContents();

  const anchor: HTMLAnchorElement = await createAnchor(
    container,
    action,
    containers,
  );
  anchor.appendChild(fragment);

  range.insertNode(anchor);
  selection.selectAllChildren(anchor);
};

// 建立 span 節點
const createAnchor = async (
  container: HTMLElement,
  action: ExecCommandStyle,
  containers: string,
): Promise<HTMLAnchorElement> => {
  const anchor: HTMLAnchorElement = document.createElement('a');
  // anchor.title = textContent;
  anchor.href = action.value;
  return anchor;
};

// 攤平子層，尋找空 span 沒有樣式的話就移除
const flattenChildren = async (
  action: ExecCommandStyle,
  span: HTMLSpanElement,
) => {
  if (!span.hasChildNodes()) return;

  // Flatten direct (> *) children with no style
  const children: HTMLElement[] = (
    Array.from(span.children) as HTMLElement[]
  ).filter(
    (element: HTMLElement) => !element.classList.contains(action.value),
  ) as HTMLElement[];

  if (children && children.length > 0) {
    children.forEach((element: HTMLElement) => {
      const styledChildren: NodeListOf<HTMLElement> =
        element.querySelectorAll('[class]');

      if (
        (!styledChildren || styledChildren.length === 0) &&
        element.textContent &&
        element.parentElement
      ) {
        const text: Text = document.createTextNode(element.textContent);
        element.parentElement.replaceChild(text, element);
      }
    });

    return;
  }

  // Direct children (> *) may have children (*) to flatten too
  const flattenChildrenChildren: Promise<void>[] = (
    Array.from(span.children) as HTMLElement[]
  ).map((element: HTMLElement) => {
    return flattenChildren(action, element);
  });

  if (!flattenChildrenChildren || flattenChildrenChildren.length <= 0) return;

  await Promise.all(flattenChildrenChildren);
};

export { execCommandLink };
