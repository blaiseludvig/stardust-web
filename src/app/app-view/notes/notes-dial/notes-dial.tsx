import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-location';
import clsx from 'clsx';
import { TbCross } from 'react-icons/tb';
import { useTalkToGod } from 'src/app/hooks/notes/useTalkToGod';
import { useAuth } from 'src/app/hooks/stores/useAuth';
import { LocationGenerics } from 'src/app/routes';
import SpeedDial from 'src/app/util/speed-dial/speed-dial';
import Tooltip from 'src/app/util/tooltip/tooltip';

/* eslint-disable-next-line */
export interface NotesDialProps {}

export function NotesDial(props: NotesDialProps) {
  const navigate = useNavigate<LocationGenerics>();
  const { mutate: talkToGod } = useTalkToGod();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return (
    <SpeedDial
      tooltipPlacement="left"
      triggerType="hover"
      pinnable
      className={clsx(
        !isAuthenticated && 'invisible',
        'fixed bottom-6 right-6'
      )}
      triggerButton={
        <>
          <button
            onMouseDown={() =>
              navigate({ search: (old) => ({ ...old, modal: 'new-note' }) })
            }
            type="button"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            <PlusIcon className="h-6 stroke-[3px] text-white transition-[height] group-hover:h-8" />
          </button>
          <Tooltip
            text="Add note"
            forElement="previousElement"
            placement="left"
            useArrow
          />
        </>
      }
    >
      <SpeedDial.DialItem
        onClick={() => talkToGod()}
        tooltip="Talk to god"
        icon={
          <TbCross className="h-6 w-6 stroke-[2px] text-gray-400 transition-[all] group-hover:h-8 group-hover:w-8" />
        }
      />
    </SpeedDial>
  );
}

export default NotesDial;
