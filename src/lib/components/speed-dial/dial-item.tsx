import { HTMLAttributes, ReactNode, useContext, useRef } from 'react';

import Tooltip from '../tooltip';
import TooltipAlignmentContext from './tooltip-alignment.context';

export interface DialItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  tooltip?: string;
}

function DialItem(props: DialItemProps) {
  const { icon, tooltip, ...otherProps } = props;

  const { tooltipPlacement } = useContext(TooltipAlignmentContext);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="group flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gray-600 bg-gray-700 text-gray-400 shadow-sm hover:bg-gray-600 hover:text-white focus:outline-none"
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
