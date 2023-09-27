import { useFirstMountState } from '@react-hookz/web';
import clsx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCloseModal } from 'src/hooks/useCloseModal';
import { layoutContext } from 'src/layouts/layoutContext';

export interface ModalFrameProps {
  hidden: boolean;
  onShow?: () => void;
  onHide?: () => void;
  customHideEffect?: () => void;
}

function ModalFrame(props: React.PropsWithChildren<ModalFrameProps>) {
  const { hidden } = props;

  const closeModal = useCloseModal();

  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      props.hidden ? props.onHide?.() : props.onShow?.();
    }
    // only needs to run when showing / hiding the modal, so we can disable this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  return createPortal(
    <div
      style={{ zIndex: layoutContext.modalBackdropZindex }}
      className={clsx(
        props.hidden && 'translate-y-full opacity-0',
        'fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-[1.5px] transition-opacity'
      )}
    >
      <div
        onMouseDown={(event) => {
          if (event.target !== event.currentTarget) return;

          if (props.customHideEffect) {
            props.customHideEffect();
          } else {
            closeModal();
          }
        }}
        style={{ zIndex: layoutContext.modalFrameZindex }}
        className="absolute left-0 right-0 top-0 flex h-[calc(100%-1rem)] w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
      >
        {props.children}
      </div>
    </div>,
    document.getElementById('app') as HTMLElement
  );
}

export default ModalFrame;
