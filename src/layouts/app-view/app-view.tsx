import { useMountEffect, useWindowSize } from '@react-hookz/web';
import {
  MatchRoute,
  Outlet,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import 'flowbite';
import { initFlowbite } from 'flowbite';
import EditNoteModal from 'src/components/modals/edit-note-modal';
import NewNoteModal from 'src/components/modals/new-note-modal';
import { SignInModal } from 'src/components/modals/sign-in-modal';
import SignUpModal from 'src/components/modals/sign-up-modal';
import NotesDial from 'src/components/notes-dial';

import { layoutContext } from '../layoutContext';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';

/* eslint-disable-next-line */
export interface AppViewProps {}

export function AppView(props: AppViewProps) {
  const search = useSearch({ from: '/' });
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  useMountEffect(() => {
    initFlowbite();
  });

  return (
    <div className="flex h-full overflow-hidden bg-slate-600">
      <Navbar />

      <Sidebar />

      <div
        style={{
          marginLeft:
            windowSize.width >= layoutContext.sidebarBreakpoint
              ? layoutContext.sidebarWidth
              : 0,
          marginTop: layoutContext.navbarHeight,
        }}
        className={
          'w-full overflow-y-auto overflow-x-hidden bg-slate-600 px-4 pt-4'
        }
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
