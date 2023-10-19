import { useClickOutside, useToggle } from '@react-hookz/web';
import clsx from 'clsx';
import { ReactNode, useRef } from 'react';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';

import { placementTypes } from '../tooltip';
import DialItem from './dial-item';
import TooltipAlignmentContext from './tooltip-alignment.context';

export interface SpeedDialProps {
  tooltipPlacement: placementTypes;
  triggerButton: ReactNode;
  triggerType: 'hover' | 'click';
  expanded?: boolean;
  pinnable?: boolean;
  pinned?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

function SpeedDial(props: React.PropsWithChildren<SpeedDialProps>) {
  const [isPinned, togglePinned] = useToggle(props.pinned);
  const [isExpanded, toggleExpanded] = useToggle(props.expanded);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    containerRef,
    props.triggerType === 'click' && !isPinned
      ? () => toggleExpanded(false)
      : // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
  );

  return (
    <TooltipAlignmentContext.Provider
      value={{
        tooltipPlacement: props.tooltipPlacement,
      }}
    >
      <div
        ref={containerRef}
        style={props.style}
        className={clsx(props.className, 'isolate')}
        onMouseLeave={
          props.triggerType === 'hover' && !isPinned
            ? () => {
                toggleExpanded(false);
              }
            : undefined
        }
      >
        <div
          className={clsx(
            isExpanded ? 'bottom-full' : 'bottom-1/2',
            'absolute left-0 right-0 z-[-1] mx-auto overflow-hidden transition-all duration-300 ease-in-out'
          )}
        >
          <div
            ref={contentRef}
            className={clsx(
              !isExpanded && 'translate-y-full opacity-0',
              'mb-3 flex flex-col items-center space-y-2 transition-all duration-300 ease-in-out'
            )}
          >
            {props.pinnable && (
              <button
                onMouseDown={() => togglePinned()}
                className="relative isolate duration-300"
              >
                <AiOutlinePushpin
                  className={clsx(
                    isPinned && '-rotate-45 opacity-0',
                    'h-6 w-6 text-white transition-all duration-[inherit]'
                  )}
                />
                <AiFillPushpin
                  className={clsx(
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
          onMouseEnter={
            props.triggerType === 'hover' && !isPinned
              ? () => toggleExpanded(true)
              : // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
          }
          onMouseDown={
            props.triggerType === 'click' && !isPinned
              ? () => toggleExpanded()
              : // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
          }
        >
          {props.triggerButton}
        </div>
      </div>
    </TooltipAlignmentContext.Provider>
  );
}

SpeedDial.DialItem = DialItem;

export default SpeedDial;
