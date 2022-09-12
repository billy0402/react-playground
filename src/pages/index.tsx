import type { NextPage } from 'next';
import { useState } from 'react';
import { useTextSelection } from 'use-text-selection';

const HomePage: NextPage = () => {
  const { clientRect, isCollapsed } = useTextSelection();
  const [currentRange, setCurrentRange] = useState<any>(null);
  const [link, setLink] = useState('');

  const createRangeUrl = () => {
    let tagString = document.createElement('a');
    tagString.href = link;

    currentRange?.surroundContents(tagString);
  };

  const createRangeTag = (tagName: 'b') => {
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

  return (
    <>
      <article contentEditable suppressContentEditableWarning>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maiores
        doloremque officiis, reiciendis asperiores distinctio. Veritatis
        suscipit quis aspernatur blanditiis. Ipsa iusto officiis quae delectus.
        Provident fugiat facilis porro dignissimos!
      </article>
      {!isCollapsed && clientRect && (
        <div
          style={{
            left: clientRect.x,
            top: clientRect.y + clientRect.height,
            position: 'absolute',
            display: 'block',
          }}
          id='control'
        >
          <button onClick={createRange}>新增連結區域</button>
          <button onClick={() => createRangeTag('b')}>粗體文字</button>
          <button onClick={createRange}>斜體文字</button>
        </div>
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
