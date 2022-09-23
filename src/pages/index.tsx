import execCommandMap from '@fixtures/exec-command-map';
import { execCommandLink } from '@helpers/exec-command-link';
import { execCommandStyle } from '@helpers/exec-command-style';
import { getSelection } from '@helpers/exec-command-utils';
import useOutsideTrigger from '@hooks/useOutsideTrigger';
import useTextSelection, { ClientRect } from '@hooks/useTextSelection';
import { ExecCommandStyle } from '@models/exec-command';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const containers = 'h1,h2,h3,h4,h5,h6,div';

const HomePage: NextPage = () => {
  const { clientRect, isCollapsed } = useTextSelection();
  const [tempPosition, setTempPosition] = useState<ClientRect>();
  const [currentRange, setCurrentRange] = useState<Range>();
  const [actionType, setActionType] = useState<'link'>();
  const [link, setLink] = useState('');
  const { ref, isOutsideTrigger, setIsOutsideTrigger } =
    useOutsideTrigger<HTMLUListElement>(false);

  useEffect(() => {
    if (actionType) return;
    setTempPosition(clientRect);
  }, [actionType, clientRect]);

  useEffect(() => {
    if (isOutsideTrigger) return;
    setActionType(undefined);
  }, [isOutsideTrigger]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    actionLink();
  };

  const actionBold = async () => {
    await execCommandStyle(execCommandMap['bold'], containers);
  };

  const actionItalic = async () => {
    await execCommandStyle(execCommandMap['italic'], containers);
  };

  const actionLink = async () => {
    if (!currentRange) return;
    getSelection()?.addRange(currentRange);

    await execCommandLink({ value: link } as ExecCommandStyle, containers);
    setActionType(undefined);
    setLink('');
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
      {(!isCollapsed || actionType) && tempPosition && (
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
                    onKeyDown={(e) => handleKeyDown(e)}
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
