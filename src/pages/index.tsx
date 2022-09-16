import { execCommands } from '@fixtures/exec-commands';
import { execCommandStyle } from '@helpers/exec-command';
import type { ClientRect } from '@hooks/useTextSelection';
import useTextSelection from '@hooks/useTextSelection';
import { ExecCommandStyle } from '@models/exec-command';
import type { NextPage } from 'next';
import { useState } from 'react';

const containers = 'h1,h2,h3,h4,h5,h6,div';

const HomePage: NextPage = () => {
  const { clientRect, isCollapsed } = useTextSelection();
  const [tempPosition, setTempPosition] = useState<ClientRect>();
  const [actionType, setActionType] = useState<'link'>();
  const [link, setLink] = useState('');

  const actionBold = async () => {
    await execCommandStyle(execCommands[0], containers);
  };

  const actionItalic = async () => {
    await execCommandStyle(execCommands[1], containers);
  };

  const actionLink = async () => {
    await execCommandStyle(
      { cmd: 'link', value: link } as ExecCommandStyle,
      containers,
    );
    setActionType(undefined);
    setTempPosition(undefined);
  };

  return (
    <>
      <article contentEditable suppressContentEditableWarning>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maiores
        doloremque officiis, reiciendis asperiores distinctio. Veritatis
        suscipit quis aspernatur blanditiis. Ipsa iusto officiis quae delectus.
        Provident fugiat facilis porro dignissimos!
      </article>
      {(!isCollapsed || actionType) && clientRect && (
        <>
          {!actionType && (
            <ol
              className='toolbar'
              style={{
                left: (tempPosition || clientRect).x,
                top:
                  (tempPosition || clientRect).y +
                  (tempPosition || clientRect).height,
              }}
            >
              <li>
                <button type='button' onClick={actionBold}>
                  粗體文字
                </button>
              </li>
              <li>
                <button type='button' onClick={actionItalic}>
                  斜體文字
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => {
                    setActionType('link');
                    setTempPosition(clientRect);
                  }}
                >
                  新增連結區域
                </button>
              </li>
            </ol>
          )}
          {actionType && (
            <ol
              className='toolbar'
              style={{
                left: (tempPosition || clientRect).x,
                top:
                  (tempPosition || clientRect).y +
                  (tempPosition || clientRect).height,
              }}
            >
              {actionType === 'link' && (
                <li>
                  <input
                    type='text'
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <button type='button' onClick={actionLink}>
                    新增連結
                  </button>
                </li>
              )}
            </ol>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
