import { DrawerInterface, DrawerOptions } from 'flowbite';
import { Drawer as FlowbiteDrawer } from 'flowbite';
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

export type DrawerFrameHandle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  setVisible(isVisible: boolean): void;
  setHidden(isHidden: boolean): void;
};

/* eslint-disable-next-line */
export interface DrawerFrameProps {
  className?: string;
  drawerWidth?: string;
  drawerHeight?: string;
  drawerOptions?: DrawerOptions;
}

export const DrawerFrame = forwardRef<
  DrawerFrameHandle,
  React.PropsWithChildren<DrawerFrameProps>
>((props: React.PropsWithChildren<DrawerFrameProps>, ref) => {
  useImperativeHandle(ref, () => {
    return {
      toggle: () => flowbiteDrawerHandle.current?.toggle(),
      show: () => flowbiteDrawerHandle.current?.show(),
      hide: () => flowbiteDrawerHandle.current?.hide(),
      setVisible(isVisible: boolean) {
        return isVisible ? this.show() : this.hide();
      },
      setHidden(isHidden: boolean) {
        return isHidden ? this.hide() : this.show();
      },
    } satisfies DrawerFrameHandle;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const flowbiteDrawerHandle = useRef<DrawerInterface | null>(null);

  useLayoutEffect(() => {
    flowbiteDrawerHandle.current = new FlowbiteDrawer(containerRef.current, {
      ...props.drawerOptions,
    });
  });

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{ width: props.drawerWidth, height: props.drawerHeight }}
    >
      {props.children}
    </div>
  );
});

export default DrawerFrame;
