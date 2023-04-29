import {
  DropdownInterface,
  DropdownOptions,
  Dropdown as FlowbiteDropdown,
} from 'flowbite';
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

export type DropdownFrameHandle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  setVisible(isVisible: boolean): void;
  setHidden(isHidden: boolean): void;
};

/* eslint-disable-next-line */
export interface DropdownFrameProps extends DropdownOptions {
  trigger: React.RefObject<HTMLElement>;
  className?: string;
}

export const DropdownFrame = forwardRef<
  DropdownFrameHandle,
  React.PropsWithChildren<DropdownFrameProps>
>((props: React.PropsWithChildren<DropdownFrameProps>, ref) => {
  useImperativeHandle(ref, () => {
    return {
      toggle: () => flowbiteDropdownHandle.current?.toggle(),
      show: () => flowbiteDropdownHandle.current?.show(),
      hide: () => flowbiteDropdownHandle.current?.hide(),
      setVisible(isVisible: boolean) {
        return isVisible ? this.show() : this.hide();
      },
      setHidden(isHidden: boolean) {
        return isHidden ? this.hide() : this.show();
      },
    } satisfies DropdownFrameHandle;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const flowbiteDropdownHandle = useRef<DropdownInterface | null>(null);

  useLayoutEffect(() => {
    flowbiteDropdownHandle.current = new FlowbiteDropdown(
      containerRef.current,
      props.trigger.current,
      { ...props }
    );
  });

  return (
    <div ref={containerRef} className={props.className}>
      {props.children}
    </div>
  );
});

export default DropdownFrame;
