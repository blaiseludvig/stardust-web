import { useFirstMountState } from '@react-hookz/web';
import classNames from 'classnames';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCloseModal } from 'src/app/hooks/useCloseModal';

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
      className={classNames(
        props.hidden && 'translate-y-full',
        'fixed inset-0 z-[100] bg-gray-900 bg-opacity-50 transition-all dark:bg-opacity-80'
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
        className="absolute top-0 left-0 right-0 z-[110] flex h-[calc(100%-1rem)] w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
      >
        {props.children}
      </div>
    </div>,
    document.getElementById('app') as HTMLElement
  );
}

export default ModalFrame;
