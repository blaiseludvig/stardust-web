import { Link, useNavigate } from '@tanstack/react-router';
import { useRef } from 'react';
import { useAuth } from 'src/features/auth/useAuth';
import { useGetProfile } from 'src/hooks/useGetProfile';
import DropdownFrame, {
  DropdownFrameHandle,
} from 'src/lib/components/dropdown-frame';

export interface NavbarDropdownProps {
  trigger: React.RefObject<HTMLElement>;
}

export function NavbarDropdown(props: NavbarDropdownProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const { isLoading, isError, data: userData, error } = useGetProfile();

  const dropdownFrameHandle = useRef<DropdownFrameHandle>(null);

  const signOut = useAuth((state) => state.signOut);

  if (!isAuthenticated) {
    return (
      <DropdownFrame
        ref={dropdownFrameHandle}
        trigger={props.trigger}
        className="z-50 hidden list-none divide-y divide-gray-600 rounded bg-gray-700 text-base shadow"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-white" role="none">
            Welcome!
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
              role="menuitem"
              onMouseDown={() => {
                dropdownFrameHandle.current?.hide();
                navigate({ search: () => ({ modal: 'signin' }) });
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
      className="z-50 hidden list-none divide-y divide-gray-600 rounded bg-gray-700 text-base shadow"
    >
      <div className="px-4 py-3" role="none">
        <p className="text-sm text-white" role="none">
          {userData?.email}
        </p>
      </div>
      <ul className="py-1" role="none">
        <li>
          <Link
            to={'/'}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
            role="menuitem"
          >
            Settings
          </Link>
        </li>

        <li>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
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
