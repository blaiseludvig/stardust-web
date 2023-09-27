import {
  ArchiveBoxArrowDownIcon,
  CloudIcon,
  CubeIcon,
  HashtagIcon,
  HeartIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ChartPieIcon } from '@heroicons/react/24/solid';
import { useWindowSize } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-router';
import { useSidebarToggle } from 'src/hooks/useSidebarToggle';
import DrawerFrame from 'src/lib/components/drawer-frame';

import { layoutContext } from '../layoutContext';
import SidebarDropdownItem from './sidebar-dropdown-item';
import SidebarItem from './sidebar-item';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SidebarProps {}

export function Sidebar(props: React.PropsWithChildren<SidebarProps>) {
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  const { toggleSidebarPinned, isSidebarPinned } = useSidebarToggle();

  return (
    <DrawerFrame
      style={{
        zIndex: layoutContext.sidebarZindex,
        paddingTop: layoutContext.navbarHeight,
        width: layoutContext.sidebarWidth,
      }}
      className="h-full border-r border-gray-700 bg-gray-800 "
      isVisible={windowSize.width >= layoutContext.sidebarBreakpoint}
      {...props}
      isPinned={isSidebarPinned}
      orientation="left-to-right"
    >
      <div className="h-full overflow-y-auto bg-gray-800 px-3 pb-4 pt-3">
        <ul className="space-y-2">
          <SidebarItem
            text="All notes"
            icon={<CubeIcon className="h-6 w-6 text-gray-500" />}
            onMouseDown={() => {
              toggleSidebarPinned(false);
              navigate({ to: '/all' });
            }}
          />

          {true && (
            <SidebarDropdownItem
              text="Dropdown test"
              icon={<ChartPieIcon className="h-6 w-6 text-gray-500" />}
              childItems={
                <>
                  <SidebarItem
                    text="Dropdown item 1"
                    icon={<CloudIcon className="h-6 w-6 text-gray-500" />}
                    onMouseDown={() => toggleSidebarPinned(false)}
                    className="pl-6"
                  />
                  <SidebarItem
                    text="Dropdown item 2"
                    icon={<HeartIcon className="h-6 w-6 text-gray-500" />}
                    onMouseDown={() => toggleSidebarPinned(false)}
                    className="pl-6"
                  />
                  <SidebarItem
                    text="Dropdown item 3"
                    icon={<HashtagIcon className="h-6 w-6 text-gray-500" />}
                    onMouseDown={() => toggleSidebarPinned(false)}
                    className="pl-6"
                  />
                </>
              }
            />
          )}

          <SidebarItem
            text="Archive"
            icon={<ArchiveBoxArrowDownIcon className="h-6 w-6 text-gray-500" />}
            onMouseDown={() => {
              toggleSidebarPinned(false);
              navigate({ to: '/archive' });
            }}
          />

          <SidebarItem
            text="Bin"
            icon={<TrashIcon className="h-6 w-6 text-gray-500" />}
            onMouseDown={() => {
              toggleSidebarPinned(false);
              navigate({ to: '/bin' });
            }}
          />
        </ul>
      </div>
    </DrawerFrame>
  );
}

export default Sidebar;
