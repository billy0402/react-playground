import { execCommands } from '@fixtures/exec-commands';
import { execCommandStyle } from '@helpers/exec-command';
import useTextSelection from '@hooks/useTextSelection';
import type { NextPage } from 'next';
import { useState } from 'react';

const containers = 'h1,h2,h3,h4,h5,h6,div';

const HomePage: NextPage = () => {
  const { clientRect, isCollapsed } = useTextSelection();
  const [currentRange, setCurrentRange] = useState<any>(null);
  const [link, setLink] = useState('');

  const createRangeUrl = () => {
    let tagString = document.createElement('a');
    tagString.href = link;

    currentRange?.surroundContents(tagString);
  };

  const createRangeTag = async (tagName: 'b') => {
    await execCommandStyle(execCommands[0], containers);
    return;

    let selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    let tagString = document.createElement(tagName);
    console.log(selection);
    console.log(range);

    tagString.classList.add('bold');
    range?.surroundContents(tagString);
  };

  const createRange = () => {
    let selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    setCurrentRange(range);
  };

  // const onExecCommand = async (
  //   selection: Selection,
  //   action: ExecCommandStyle,
  //   containers: string,
  // ) => {
  //   await execCommandStyle(selection, action, containers);
  // };

  return (
    <>
      <article contentEditable suppressContentEditableWarning>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maiores
        doloremque officiis, reiciendis asperiores distinctio. Veritatis
        suscipit quis aspernatur blanditiis. Ipsa iusto officiis quae delectus.
        Provident fugiat facilis porro dignissimos!
      </article>
      {!isCollapsed && clientRect && (
        <ol
          style={{
            left: clientRect.x,
            top: clientRect.y + clientRect.height,
            position: 'absolute',
            display: 'block',
          }}
          id='control'
        >
          <li>
            <button onClick={createRange}>新增連結區域</button>
          </li>
          <li>
            <button onClick={() => createRangeTag('b')}>粗體文字</button>
          </li>
          <li>
            <button onClick={createRange}>斜體文字</button>
          </li>
        </ol>
      )}

      <span>
        {currentRange?.startOffset}
        <input type='text' onChange={(e) => setLink(e.target.value)} />
      </span>
      <span onClick={() => createRangeUrl()}>新增連結</span>
    </>
  );
};

export default HomePage;
