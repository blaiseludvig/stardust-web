import { Tooltip as FlowbiteTooltip } from 'flowbite';
import { TooltipInterface, TooltipOptions } from 'flowbite';
import { ReactNode, RefObject, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { layoutContext } from 'src/layouts/layoutContext';
import { match } from 'ts-pattern';

export type placementTypes = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps extends TooltipOptions {
  text: ReactNode;
  useArrow?: boolean;
  forElement: RefObject<HTMLElement> | 'previousElement' | 'nextElement';
}

function Tooltip(props: TooltipProps) {
  const { text, useArrow, forElement, ...otherProps } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const flowbiteTooltipHandle = useRef<TooltipInterface | null>(null);

  useLayoutEffect(() => {
    const trigger = match(props.forElement)
      .with('nextElement', () => containerRef.current?.nextElementSibling)
      .with(
        'previousElement',
        () => containerRef.current?.previousElementSibling
      )
      .otherwise((ref) => ref.current);

    if (trigger) {
      flowbiteTooltipHandle.current = new FlowbiteTooltip(
        containerRef.current,
        trigger as HTMLElement,
        { ...otherProps }
      );
    }
  });

  const component = (
    <div
      ref={containerRef}
      role="tooltip"
      style={{ zIndex: layoutContext.tooltipZindex }}
      className="tooltip invisible absolute inline-block w-max rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
    >
      {props.text}
      {props.useArrow && (
        <div className="tooltip-arrow" data-popper-arrow></div>
      )}
    </div>
  );

  // The portal is used because the tooltips cannot be displayed if a parent element has overflow hidden set on it
  if (typeof props.forElement !== 'string') {
    return createPortal(
      component,
      document.getElementById('app') as HTMLElement
    );
  } else {
    return component;
  }
}

export default Tooltip;
