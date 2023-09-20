import { useMountEffect } from '@react-hookz/web';
import {
  MatchRoute,
  Outlet,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import clsx from 'clsx';
import 'flowbite';
import { initFlowbite } from 'flowbite';
import { useRef } from 'react';

import { SignInModal } from '../auth/sign-in-modal/sign-in-modal';
import SignUpModal from '../auth/sign-up-modal/sign-up-modal';
import styles from './app-view.module.scss';
import Navbar from './navbar/navbar';
import EditNoteModal from './notes/modals/edit-note-modal';
import NewNoteModal from './notes/modals/new-note-modal';
import NotesDial from './notes/notes-dial/notes-dial';
import Sidebar, { SidebarHandle } from './sidebar/sidebar';

/* eslint-disable-next-line */
export interface AppViewProps {}

export function AppView(props: AppViewProps) {
  const search = useSearch({ from: '/' });
  const navigate = useNavigate();

  const noteContainerRef = useRef<HTMLDivElement>(null);
  const sidebarHandle = useRef<SidebarHandle>(null);

  useMountEffect(() => {
    initFlowbite();
  });

  return (
    <div className="flex h-full overflow-hidden bg-slate-600">
      <Navbar sidebarRef={sidebarHandle} />

      <Sidebar
        ref={sidebarHandle}
        drawerWidth="16rem"
        className="z-20 mt-14 h-[calc(100%-3.5rem)]"
      />

      <div
        ref={noteContainerRef}
        className={clsx(
          styles['notes-container'],
          'mt-14 h-[calc(100%-3.5rem)] w-full overflow-y-scroll bg-slate-600 px-4 pt-4'
        )}
      >
        <Outlet />

        <MatchRoute to="all">
          <NotesDial />
        </MatchRoute>
      </div>

      <SignInModal hidden={search.modal !== 'signin'} />

      <SignUpModal hidden={search.modal !== 'signup'} />

      <NewNoteModal hidden={search.modal !== 'new-note'} />

      <EditNoteModal
        hidden={search.modal !== 'edit-note'}
        customHideEffect={() =>
          navigate({
            search: (old) => ({
              ...old,
              modal: undefined,
              editNote: undefined,
            }),
          })
        }
      />
    </div>
  );
}

export default AppView;
