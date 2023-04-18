import { useFirstMountState } from '@react-hookz/web';
import { ModalInterface, ModalOptions } from 'flowbite';
import { Modal as FlowbiteModal } from 'flowbite';
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './modal-frame.module.scss';

export type ModalFrameHandle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  setVisible(isVisible: boolean): void;
  setHidden(isHidden: boolean): void;
};

/* eslint-disable-next-line */
export interface ModalFrameProps extends ModalOptions {}

export const ModalFrame = forwardRef<
  ModalFrameHandle,
  React.PropsWithChildren<ModalFrameProps>
>((props: React.PropsWithChildren<ModalFrameProps>, ref) => {
  useImperativeHandle(ref, () => {
    return {
      show: () => flowbiteModalHandle.current?.show(),
      hide: () => flowbiteModalHandle.current?.hide(),
      toggle: () => flowbiteModalHandle.current?.toggle(),
      setVisible(isVisible: boolean) {
        return isVisible ? this.show() : this.hide();
      },
      setHidden(isHidden: boolean) {
        return isHidden ? this.hide() : this.show();
      },
    } satisfies ModalFrameHandle;
  });

  const isFirstMount = useFirstMountState();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const flowbiteModalHandle = useRef<ModalInterface | null>(null);

  useLayoutEffect(() => {
    if (!isFirstMount && !flowbiteModalHandle.current) {
      flowbiteModalHandle.current = new FlowbiteModal(containerRef.current, {
        ...props,
      });
    }
  });

  return createPortal(
    <div
      ref={containerRef}
      tabIndex={-1}
      aria-hidden="true"
      className="absolute top-0 left-0 right-0 z-50 hidden h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
    >
      {props.children}
    </div>,
    document.getElementById('app') as HTMLElement
  );
});

export default ModalFrame;
