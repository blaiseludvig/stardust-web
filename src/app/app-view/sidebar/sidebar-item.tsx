import clsx from 'clsx';
import { ReactNode } from 'react';

export interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

function SidebarItem(props: SidebarItemProps) {
  return (
    <li>
      <div
        onMouseDown={props.onMouseDown}
        className={clsx(
          props.className,
          'flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        )}
      >
        <div className="h-6 w-6">{props.icon}</div>
        <span className="ml-3 flex-1 whitespace-nowrap">{props.text}</span>
      </div>
    </li>
  );
}

export default SidebarItem;
