import { useClickOutside, useToggle } from '@react-hookz/web';
import classnames from 'classnames';
import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { match } from 'ts-pattern';

import { placementTypes } from '../tooltip/tooltip';
import DialAlignmentContext, { alignmentTypes } from './dial-alignment.context';
import DialItem from './dial-item';

export interface SpeedDialProps {
  alignment: alignmentTypes;
  tooltipPlacement: placementTypes;
  triggerButton: ReactNode;
  triggerType: 'hover' | 'click';
  expanded?: boolean;
  pinnable?: boolean;
  pinned?: boolean;
  className?: string;
}

// TODO: Fix horizontal aligned variation
function SpeedDial(props: React.PropsWithChildren<SpeedDialProps>) {
  const [isPinned, togglePinned] = useToggle(props.pinned);
  const [isExpanded, toggleExpanded] = useToggle(props.expanded);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const parentVariation = match(props.alignment)
    .with('vertical', () => '')
    .with('horizontal', () => 'flex')
    .exhaustive();

  const contentVariation = match(props.alignment)
    .with('vertical', () => 'mb-3 flex-col space-y-2')
    .with('horizontal', () => 'mr-3 space-x-2')
    .exhaustive();

  useClickOutside(
    containerRef,
    props.triggerType === 'click' && !isPinned
      ? () => toggleExpanded(false)
      : // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
  );

  return (
    <DialAlignmentContext.Provider
      value={{
        tooltipPlacement: props.tooltipPlacement,
        alignment: props.alignment,
      }}
    >
      <div
        ref={containerRef}
        className={classNames(parentVariation, props.className, 'isolate')}
        onMouseEnter={
          props.triggerType === 'hover' && !isPinned
            ? () => {
                toggleExpanded(true);
              }
            : undefined
        }
        onMouseLeave={
          props.triggerType === 'hover' && !isPinned
            ? () => {
                toggleExpanded(false);
              }
            : undefined
        }
      >
        <div
          className={classnames(
            isExpanded ? 'bottom-full' : 'bottom-1/2',
            'absolute left-0 right-0 z-[-1] mx-auto overflow-hidden transition-all duration-300 ease-in-out'
          )}
        >
          <div
            ref={contentRef}
            className={classNames(
              !isExpanded && 'translate-y-full opacity-0',
              contentVariation,
              'flex items-center transition-all duration-300 ease-in-out'
            )}
          >
            {props.pinnable && (
              <button
                onMouseDown={() => togglePinned()}
                className="relative isolate duration-300"
              >
                <AiOutlinePushpin
                  className={classnames(
                    isPinned && '-rotate-45 opacity-0',
                    'h-6 w-6 text-white transition-all duration-[inherit]'
                  )}
                />
                <AiFillPushpin
                  className={classnames(
                    isPinned && '-rotate-45 opacity-100',
                    'absolute inset-0 z-[10] h-6 w-6 text-white opacity-0 transition-all duration-[inherit]'
                  )}
                />
              </button>
            )}
            {props.children}
          </div>
        </div>

        <div
          onMouseDown={
            props.triggerType === 'click' && !isPinned
              ? () => toggleExpanded()
              : undefined
          }
        >
          {props.triggerButton}
        </div>
      </div>
    </DialAlignmentContext.Provider>
  );
}

SpeedDial.DialItem = DialItem;

export default SpeedDial;
