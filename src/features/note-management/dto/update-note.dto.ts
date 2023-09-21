import { NoteData } from 'src/features/note-management/hooks/useGetNotes';
import { SetRequired } from 'type-fest';

export type UpdateNoteDto = SetRequired<Partial<NoteData>, 'noteId'>;
