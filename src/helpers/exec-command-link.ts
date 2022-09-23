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
    container.getAttribute('href')
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
  container.setAttribute('href', action.value);
  await cleanChildren(action, container);
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
    element.getAttribute('href'),
  ) as HTMLElement[];

  if (children && children.length > 0) {
    span.replaceWith(...Array.from(children));
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

export { execCommandLink };
