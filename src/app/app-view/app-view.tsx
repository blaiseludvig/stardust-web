import { useMountEffect } from '@react-hookz/web';
import { MatchRoute } from '@tanstack/react-location';
import classNames from 'classnames';
import 'flowbite';
import { initFlowbite } from 'flowbite';
import { useContext, useRef } from 'react';

import { SignInModal } from '../auth/sign-in-modal/sign-in-modal';
import SignUpModal from '../auth/sign-up-modal/sign-up-modal';
import AuthContext from '../contexts/auth.context';
import styles from './app-view.module.scss';
import Navbar from './navbar/navbar';
import NewNoteModal from './new-note-modal/new-note-modal';
import NotesDial from './notes/notes-dial/notes-dial';
import NotesView from './notes/notes-view/notes-view';
import Sidebar, { SidebarHandle } from './sidebar/sidebar';

/* eslint-disable-next-line */
export interface AppViewProps {}

export function AppView(props: AppViewProps) {
  const noteContainerRef = useRef<HTMLDivElement>(null);
  const sidebarHandle = useRef<SidebarHandle>(null);
  const { isAuthenticated } = useContext(AuthContext);

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
        className={classNames(
          styles['notes-container'],
          'mt-14 h-[calc(100%-3.5rem)] w-full overflow-y-scroll bg-slate-600 px-4 pt-4'
        )}
      >
        <NotesView />
        {isAuthenticated && <NotesDial />}
      </div>

      <MatchRoute to={'signin'}>
        <SignInModal />
      </MatchRoute>

      <MatchRoute to={'signup'}>
        <SignUpModal />
      </MatchRoute>

      <MatchRoute to={'new'}>
        <NewNoteModal />
      </MatchRoute>
    </div>
  );
}

export default AppView;
