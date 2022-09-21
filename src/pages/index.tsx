import { execCommands } from '@fixtures/exec-commands';
import { execCommandStyle } from '@helpers/exec-command';
import useOutsideTrigger from '@hooks/useOutsideTrigger';
import useTextSelection from '@hooks/useTextSelection';
import { ExecCommandStyle } from '@models/exec-command';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const containers = 'h1,h2,h3,h4,h5,h6,div';
const defaultPosition = { x: 0, y: 0, height: 0 };

const HomePage: NextPage = () => {
  const { clientRect, isCollapsed } = useTextSelection();
  const [tempPosition, setTempPosition] = useState(defaultPosition);
  const [currentRange, setCurrentRange] = useState<Range>();
  const [actionType, setActionType] = useState<'link'>();
  const [link, setLink] = useState('');
  const { ref, isOutsideTrigger, setIsOutsideTrigger } =
    useOutsideTrigger<HTMLUListElement>(false);

  useEffect(() => {
    if (actionType) return;
    setTempPosition(clientRect || defaultPosition);
  }, [actionType, clientRect]);

  useEffect(() => {
    if (isOutsideTrigger) return;
    setActionType(undefined);
  }, [isOutsideTrigger]);

  const actionBold = async () => {
    await execCommandStyle(execCommands[0], containers);
  };

  const actionItalic = async () => {
    await execCommandStyle(execCommands[1], containers);
  };

  const actionLink = async () => {
    if (!currentRange) return;
    getSelection()?.addRange(currentRange);

    await execCommandStyle(
      { cmd: 'link', value: link } as ExecCommandStyle,
      containers,
    );
    setActionType(undefined);
    setTempPosition(defaultPosition);
  };

  return (
    <>
      <article
        contentEditable
        suppressContentEditableWarning
        onSelect={() => {
          setCurrentRange(getSelection()?.getRangeAt(0));
        }}
        // onMouseDown={() => console.log('onMouseDown')}
        // onTouchStart={() => console.log('onTouchStart')}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maiores
        doloremque officiis, reiciendis asperiores distinctio. Veritatis
        suscipit quis aspernatur blanditiis. Ipsa iusto officiis quae delectus.
        Provident fugiat facilis porro dignissimos!
      </article>
      {(!isCollapsed || actionType) && clientRect && (
        <>
          {!actionType && (
            <ul
              className='toolbar'
              style={{
                left: tempPosition.x,
                top: tempPosition.y + tempPosition.height,
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
                    setIsOutsideTrigger(true);
                  }}
                >
                  新增連結區域
                </button>
              </li>
            </ul>
          )}
          {actionType && isOutsideTrigger && (
            <ul
              className='toolbar'
              style={{
                left: tempPosition.x,
                top: tempPosition.y + tempPosition.height,
              }}
              ref={ref}
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
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
