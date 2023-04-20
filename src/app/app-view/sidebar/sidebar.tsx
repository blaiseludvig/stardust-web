import {
  ArchiveBoxArrowDownIcon,
  CubeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  ChartPieIcon,
  ChevronDownIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/solid';
import { Squares2X2Icon } from '@heroicons/react/24/solid';
import { useNavigate } from '@tanstack/react-location';
import classNames from 'classnames';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Collapsible, {
  CollapsibleHandle,
} from 'src/app/util/collapsible/collapsible';
import DrawerFrame, {
  DrawerFrameHandle,
  DrawerFrameProps,
} from 'src/app/util/drawer-frame/drawer-frame';

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
  const collapsibleHandle = useRef<CollapsibleHandle>(null);

  const dropdownButton = useRef<HTMLButtonElement>(null);
  const dropdownIcon = useRef<SVGSVGElement>(null);

  const isCollapsed = useRef<boolean>(true);

  const { className, ...otherProps } = props;

  return (
    <DrawerFrame
      className={classNames(
        'fixed top-0 left-0 -translate-x-full border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0',
        props.className
      )}
      ref={drawerFrameHandle}
      {...otherProps}
    >
      <div className="h-full overflow-y-auto bg-white px-3 pt-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <div
              onMouseDown={() => navigate({ to: '/app' })}
              className="flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <CubeIcon className="h-6 w-6 text-gray-500" />
              <span className="ml-3 flex-1 whitespace-nowrap">All notes</span>
            </div>
          </li>

          <li className="overflow-hidden">
            <button
              ref={dropdownButton}
              onMouseDown={() => {
                isCollapsed.current = !isCollapsed.current;
                if (isCollapsed.current) {
                  dropdownIcon.current?.classList.toggle('-rotate-90');
                  if (collapsibleHandle.current?.containerRef.current) {
                    collapsibleHandle.current.containerRef.current.style.maxHeight =
                      '0px';
                  }
                } else {
                  dropdownIcon.current?.classList.toggle('-rotate-90');
                  if (collapsibleHandle.current?.containerRef.current) {
                    collapsibleHandle.current.containerRef.current.style.maxHeight = `${collapsibleHandle.current.containerRef.current.scrollHeight}px`;
                  }
                }
              }}
              type="button"
              className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <ChartPieIcon className="h-6 w-6 text-gray-500" />
              <span className="ml-3 flex-1 whitespace-nowrap text-left">
                Dropdown test
              </span>
              <ChevronDownIcon
                ref={dropdownIcon}
                className="h-6 w-6 -rotate-90 text-gray-500 duration-[300ms]"
              />
            </button>

            <div className="overflow-hidden">
              <Collapsible
                ref={collapsibleHandle}
                className="max-h-0 overflow-hidden transition-[max-height] duration-[300ms] ease-in-out"
              >
                <ul className="space-y-2 py-2">
                  <li>
                    <a
                      href="/"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Billing
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Invoice
                    </a>
                  </li>
                </ul>
              </Collapsible>
            </div>
          </li>

          <li>
            <a
              href="/"
              className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Squares2X2Icon className="h-6 w-6 text-gray-500" />
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Square3Stack3DIcon className="h-6 w-6 text-gray-500" />
              <span className="ml-3 flex-1 whitespace-nowrap">Kanban</span>
              <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <ArchiveBoxArrowDownIcon className="h-6 w-6 text-gray-500" />
              <span className="ml-3 flex-1 whitespace-nowrap">Inbox</span>
            </a>
          </li>

          <li>
            <div
              onMouseDown={() => navigate({ to: 'bin' })}
              className="flex w-full cursor-pointer items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <TrashIcon className="h-6 w-6 text-gray-500" />
              <span className="ml-3 flex-1 whitespace-nowrap">Bin</span>
            </div>
          </li>
        </ul>
      </div>
    </DrawerFrame>
  );
});

export default Sidebar;
