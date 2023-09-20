import {
  ArchiveBoxArrowDownIcon,
  CloudIcon,
  CubeIcon,
  HashtagIcon,
  HeartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ChartPieIcon } from '@heroicons/react/24/solid';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import DrawerFrame, {
  DrawerFrameHandle,
  DrawerFrameProps,
} from 'src/app/util/drawer-frame/drawer-frame';

import SidebarDropdownItem from './sidebar-dropdown-item';
import SidebarItem from './sidebar-item';

export type SidebarHandle = {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  setVisible(isVisible: boolean): void;
  setHidden(isHidden: boolean): void;
};

/* eslint-disable-next-line */
export interface SidebarProps extends DrawerFrameProps {}

export const Sidebar = forwardRef<
  SidebarHandle,
  React.PropsWithChildren<SidebarProps>
>((props: React.PropsWithChildren<SidebarProps>, ref) => {
  useImperativeHandle(ref, () => {
    return {
      toggle: () => drawerFrameHandle.current?.toggle(),
      show: () => drawerFrameHandle.current?.show(),
      hide: () => drawerFrameHandle.current?.hide(),
      setVisible(isVisible: boolean) {
        return isVisible ? this.show() : this.hide();
      },
      setHidden(isHidden: boolean) {
        return isHidden ? this.hide() : this.show();
      },
    } satisfies SidebarHandle;
  });

  const navigate = useNavigate();

  const drawerFrameHandle = useRef<DrawerFrameHandle>(null);

  const { className, ...otherProps } = props;

  return (
    <DrawerFrame
      className={clsx(
        'fixed left-0 top-0 -translate-x-full border-r border-gray-700 bg-gray-800 transition-transform sm:translate-x-0',
        props.className
      )}
      ref={drawerFrameHandle}
      {...otherProps}
    >
      <div className="h-full overflow-y-auto bg-gray-800 px-3 pb-4 pt-3">
        <ul className="space-y-2">
          <SidebarItem
            text="All notes"
            icon={<CubeIcon className="h-6 w-6 text-gray-500" />}
            onMouseDown={() => navigate({ to: '/all' })}
          />

          {true && (
            <SidebarDropdownItem
              text="Dropdown test"
              icon={<ChartPieIcon className="h-6 w-6 text-gray-500" />}
              childItems={
                /* eslint-disable @typescript-eslint/no-empty-function */
                <>
                  <SidebarItem
                    text="Dropdown item 1"
                    icon={<CloudIcon className="h-6 w-6 text-gray-500" />}
                    onMouseDown={() => {}}
                    className="pl-6"
                  />
                  <SidebarItem
                    text="Dropdown item 2"
                    icon={<HeartIcon className="h-6 w-6 text-gray-500" />}
                    onMouseDown={() => {}}
                    className="pl-6"
                  />
                  <SidebarItem
                    text="Dropdown item 3"
                    icon={<HashtagIcon className="h-6 w-6 text-gray-500" />}
                    onMouseDown={() => {}}
                    className="pl-6"
                  />
                </>
                /* eslint-enable @typescript-eslint/no-empty-function */
              }
            />
          )}

          <SidebarItem
            text="Archive"
            icon={<ArchiveBoxArrowDownIcon className="h-6 w-6 text-gray-500" />}
            onMouseDown={() => navigate({ to: '/archive' })}
          />

          <SidebarItem
            text="Bin"
            icon={<TrashIcon className="h-6 w-6 text-gray-500" />}
            onMouseDown={() => navigate({ to: '/bin' })}
          />
        </ul>
      </div>
    </DrawerFrame>
  );
});

export default Sidebar;
