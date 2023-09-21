import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ReactNode, useRef } from 'react';
import Collapsible, { CollapsibleHandle } from 'src/lib/components/collapsible';

export interface SidebarDropdownItemProps {
  text: string;
  icon?: ReactNode;
  childItems?: ReactNode;
}

function SidebarDropdownItem(props: SidebarDropdownItemProps) {
  const isCollapsed = useRef<boolean>(true);
  const collapsibleHandle = useRef<CollapsibleHandle>(null);

  const dropdownButton = useRef<HTMLButtonElement>(null);
  const dropdownIcon = useRef<SVGSVGElement>(null);

  return (
    <li>
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
        className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 hover:bg-gray-700"
      >
        <div className="h-6 w-6">{props.icon}</div>
        <span className="ml-3 flex-1 whitespace-nowrap text-left">
          {props.text}
        </span>
        <ChevronDownIcon
          ref={dropdownIcon}
          className="h-6 w-6 -rotate-90 text-gray-500 duration-[300ms]"
        />
      </button>

      <div>
        <Collapsible
          ref={collapsibleHandle}
          className="max-h-0 overflow-hidden transition-[max-height] duration-[300ms] ease-in-out"
        >
          <ul className="space-y-2 py-2">{props.childItems}</ul>
        </Collapsible>
      </div>
    </li>
  );
}

export default SidebarDropdownItem;
