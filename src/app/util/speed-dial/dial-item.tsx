import { HTMLAttributes, ReactNode, useContext, useRef } from 'react';

import Tooltip from '../tooltip/tooltip';
import DialAlignmentContext from './dial-alignment.context';

export interface DialItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  tooltip?: string;
}

function DialItem(props: DialItemProps) {
  const { icon, tooltip, ...otherProps } = props;

  const { tooltipPlacement } = useContext(DialAlignmentContext);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="group flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        {...otherProps}
      >
        {icon}
      </button>

      <Tooltip
        text={props.tooltip}
        forElement={buttonRef}
        triggerType="hover"
        placement={tooltipPlacement}
        useArrow
      />
    </>
  );
}

export default DialItem;
