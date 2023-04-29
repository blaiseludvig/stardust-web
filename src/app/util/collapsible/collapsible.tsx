import classNames from 'classnames';
import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export type CollapsibleHandle = {
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
  setCollapsed(isCollapsed: boolean): void;
  setExpanded(isExpanded: boolean): void;
  containerRef: React.RefObject<HTMLDivElement>;
};

/* eslint-disable-next-line */
export interface CollapsibleProps {
  trigger?: React.RefObject<HTMLButtonElement>;
  collapsed?: boolean;
  className?: string;
  onCollapse?: (container?: HTMLDivElement, ...rest: unknown[]) => unknown;
  onExpand?: (container?: HTMLDivElement, ...rest: unknown[]) => unknown;
  onToggle?: (container?: HTMLDivElement, ...rest: unknown[]) => unknown;
}

export const Collapsible = forwardRef<
  CollapsibleHandle,
  React.PropsWithChildren<CollapsibleProps>
>((props: PropsWithChildren<CollapsibleProps>, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handle: CollapsibleHandle = {
    isCollapsed: () => {
      return containerRef.current?.classList.contains('hidden') ? true : false;
    },
    isExpanded() {
      return !handle.isCollapsed();
    },
    collapse: () => {
      containerRef.current?.classList.add('hidden');
      props.onCollapse?.();
    },
    expand: () => {
      containerRef.current?.classList.remove('hidden');
      props.onExpand?.();
    },
    toggle() {
      handle.isExpanded() ? handle.collapse() : handle.expand();
      props.onToggle?.();
    },
    setCollapsed(next: boolean) {
      next ? handle.collapse() : handle.expand();
    },
    setExpanded(next: boolean) {
      next ? handle.expand() : handle.collapse();
    },
    containerRef: containerRef,
  };
  useImperativeHandle(ref, () => handle);

  useEffect(() => {
    props.trigger?.current?.addEventListener('click', handle.toggle);

    return () => {
      props.trigger?.current?.removeEventListener('click', handle.toggle);
    };
  }, [handle.toggle, props.trigger]);

  return (
    <div
      ref={containerRef}
      className={classNames(props.className, props.collapsed ? 'hidden' : '')}
    >
      {props.children}
    </div>
  );
});

export default Collapsible;
