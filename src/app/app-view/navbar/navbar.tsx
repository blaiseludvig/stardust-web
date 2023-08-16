import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@tanstack/react-location';
import { useRef } from 'react';

import { SidebarHandle } from '../sidebar/sidebar';
import NavbarDropdown from './navbar-dropdown/navbar-dropdown';

export interface NavbarProps {
  sidebarRef: React.RefObject<SidebarHandle>;
}

export function Navbar(props: NavbarProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <nav className="fixed top-0 z-40 w-full border-b-2 border-gray-700 bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              //TODO: ADD SIDEBAR TOGGLE
              onClick={() => {
                props.sidebarRef.current?.toggle();
              }}
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm  text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to={'/'}>
              <div className="ml-2 flex md:mr-24">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white sm:text-2xl">
                  Stardust
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="ml-3 flex items-center">
              <div className="flex flex-row">
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm hover:ring-[5px] hover:ring-gray-600 focus:ring-[7px] focus:ring-gray-500 transition ease-in-out duration-300"
                  ref={buttonRef}
                >
                  <span className="sr-only">Open user menu</span>

                  <UserCircleIcon className="h-6 w-6 text-white" />
                </button>

                <NavbarDropdown trigger={buttonRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
