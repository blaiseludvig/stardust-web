import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useSidebarToggle } from 'src/hooks/useSidebarToggle';
import { layoutContext } from 'src/layouts/layoutContext';
import { match } from 'ts-pattern';
import { Schema } from 'type-fest';

type orientation =
  | 'left-to-right'
  | 'right-to-left'
  | 'top-to-bottom'
  | 'bottom-to-top';

export interface DrawerFrameProps {
  isVisible: boolean;
  isPinned: boolean;
  orientation: orientation;
  onShow?: () => void;
  onHide?: () => void;
  onToggle?: () => void;
}

// we need the keys of DrawerFrameProps at runtime
// to delete them from divProps later

const dummyObject = {
  isVisible: undefined,
  isPinned: undefined,
  orientation: undefined,
  onHide: undefined,
  onShow: undefined,
  onToggle: undefined,
} as const satisfies Schema<Required<DrawerFrameProps>, undefined>;

const DrawerFramePropsKeys = Object.keys(dummyObject) as [
  keyof DrawerFrameProps
];

export function DrawerFrame(
  props: React.PropsWithChildren<DrawerFrameProps> &
    React.ComponentPropsWithoutRef<'div'>
) {
  const { toggleSidebarPinned } = useSidebarToggle();
  const { isVisible, isPinned, orientation, onShow, onHide, onToggle } = props;

  // determines if the drawer is currently shown
  const isShown = isVisible || isPinned;
  const prevIsShown = useRef(isShown);

  // clone the props
  const divProps = { ...props };

  // remove the the DrawerFrameProps
  DrawerFramePropsKeys.forEach((key) => delete divProps[key]);

  const positioningClass = match(orientation)
    .with('left-to-right', () => 'left-0')
    .with('right-to-left', () => 'right-0')
    .with('top-to-bottom', () => 'top-0')
    .with('bottom-to-top', () => 'bottom-0')
    .exhaustive();

  // the class responsible for hiding the element
  const hiderClass = match(orientation)
    .with('left-to-right', () => '-translate-x-full')
    .with('right-to-left', () => 'translate-x-full')
    .with('top-to-bottom', () => '-translate-y-full')
    .with('bottom-to-top', () => 'translate-y-full')
    .exhaustive();

  const className = clsx(
    'fixed transition-transform',
    !isVisible && !isPinned && hiderClass,
    positioningClass,
    divProps.className
  );

  useEffect(() => {
    const toggleAndShow = () => {
      onToggle?.();
      onShow?.();
    };
    const toggleAndHide = () => {
      onToggle?.();
      onHide?.();
    };

    if (prevIsShown.current === false && isShown) toggleAndShow();
    if (prevIsShown.current === true && !isShown) toggleAndHide();

    prevIsShown.current = isShown;

    // this effect only fires when the visibility actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isPinned]);

  return (
    <>
      <div
        style={{ zIndex: layoutContext.drawerBackdropZindex }}
        onMouseDown={() => toggleSidebarPinned()}
        className={clsx(
          !props.isPinned && 'translate-x-full opacity-0',
          'fixed h-full w-full bg-gray-900 bg-opacity-80 backdrop-blur-[1.5px] transition-opacity'
        )}
      ></div>
      <div {...divProps} className={className}>
        {props.children}
      </div>
    </>
  );
}

export default DrawerFrame;
