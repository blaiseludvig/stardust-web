import { useWindowSize } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-router';
import Muuri from 'muuri';
import { ReactNode } from 'react';
import DraggableGrid from 'ruuri';
import Unauthenticated from 'src/components/note-views/unathenticated';
import { useAuth } from 'src/features/auth/useAuth';
import {
  NoteData,
  useGetNotes,
} from 'src/features/note-management/hooks/useGetNotes';
import Spinner from 'src/lib/components/spinner';

import NoteCard from '../components/note-card';

export const DRAG_HANDLE_CLASS = 'card-drag-handle';

export interface NoteViewProps {
  data: NoteData[];
  noDataElement?: ReactNode;
  beforeGridElement?: ReactNode;
}

function NoteView(props: React.PropsWithChildren<NoteViewProps>) {
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  const { isLoading, isError, error } = useGetNotes();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  return props.data.length === 0 ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{props.noDataElement}</>
  ) : (
    <div>
      {props.beforeGridElement}
      {/* // TODO: The drag handle class is not reactive
      // This is an upstream issue with muuri */}
      {/* // TODO: preserve item order on the backend */}
      {/* // TODO: Add auto scrolling when dragging*/}
      <DraggableGrid
        data={props.data}
        uniKey="noteId"
        renderItem={(data) => (
          <NoteCard
            data={data}
            className={windowSize.width >= 768 ? DRAG_HANDLE_CLASS : ''}
          />
        )}
        getItemProps={() => ({
          className: 'w-full p-2 sm:w-1/2 xl:w-1/3 cursor-default',
        })}
        getItemContentProps={() => ({ className: 'cursor-default' })}
        dragHandle={`.${DRAG_HANDLE_CLASS}`}
        dragStartPredicate={(item, dragEvent) => {
          const { deltaTime, distance, isFinal } = dragEvent;
          const noteId = item.getElement()?.getAttribute('data-ruuri-id');

          const targetName = dragEvent.target.tagName.toLowerCase();

          if (windowSize.width >= 768) {
            if (['button', 'svg', 'path'].includes(targetName)) return false;
          }

          if (deltaTime < 200 && distance < 20) {
            if (isFinal) {
              navigate({
                search: (old) => ({
                  ...old,
                  modal: 'edit-note',
                  editNote: noteId,
                }),
              });

              Muuri.ItemDrag.defaultStartPredicate(item, dragEvent);
              return false;
            }
          } else {
            return true;
          }
        }}
        layout={{ fillGaps: false }}
      />
    </div>
  );
}

export default NoteView;
