import { SetRequired } from 'type-fest';

import { NoteData } from '../hooks/notes/useGetNotes';

export type UpdateNoteDto = SetRequired<Partial<NoteData>, 'noteId'>;
