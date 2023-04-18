import { Link, useNavigate } from '@tanstack/react-location';
import { useRef } from 'react';
import { useIsSignedIn } from 'src/app/hooks/auth/useIsSignedIn';
import { useSignOut } from 'src/app/hooks/auth/useSignOut';
import { useGetProfile } from 'src/app/hooks/useGetProfile';
import DropdownFrame, {
  DropdownFrameHandle,
} from 'src/app/util/dropdown-frame/dropdown-frame';

export interface NavbarDropdownProps {
  trigger: React.RefObject<HTMLElement>;
}

export function NavbarDropdown(props: NavbarDropdownProps) {
  const navigate = useNavigate();
  const isSignedIn = useIsSignedIn();

  const { isLoading, isError, data: userData, error } = useGetProfile();

  const dropdownFrameHandle = useRef<DropdownFrameHandle>(null);

  const signOut = useSignOut();

  if (!isSignedIn()) {
    return (
      <DropdownFrame
        ref={dropdownFrameHandle}
        trigger={props.trigger}
        className="z-50 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900 dark:text-white" role="none">
            Welcome!
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
              onMouseDown={() => {
                dropdownFrameHandle.current?.hide();
                navigate({ to: 'signin' });
              }}
            >
              Sign in
            </button>
          </li>
        </ul>
      </DropdownFrame>
    );
  }

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  return (
    <DropdownFrame
      ref={dropdownFrameHandle}
      trigger={props.trigger}
      className="z-50 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <div className="px-4 py-3" role="none">
        <p className="text-sm text-gray-900 dark:text-white" role="none">
          {userData?.email}
        </p>
      </div>
      <ul className="py-1" role="none">
        <li>
          <Link
            to={'settings'}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
          >
            Settings
          </Link>
        </li>

        <li>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            onClick={() => {
              dropdownFrameHandle.current?.hide();
              signOut();
            }}
          >
            Sign out
          </button>
        </li>
      </ul>
    </DropdownFrame>
  );
}

export default NavbarDropdown;
