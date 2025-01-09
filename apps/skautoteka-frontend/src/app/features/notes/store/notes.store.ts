import { InputConfig } from '@skautoteka-frontend/ui';
import { Note } from '../interfaces/note';
import { signalStore, withState } from '@ngrx/signals';
import { withNotesMethods } from './notes.methods';
import { withPermissions } from '@skautoteka-frontend/common';

export type NotesStoreState = {
  notes: Note[];
  isLoading: boolean;
  activeNote: Note | null;
  selectedNote: Note | null;
  createFields: InputConfig | null;
  noteFields: InputConfig | null;
};

const initialState: NotesStoreState = {
  notes: [],
  isLoading: false,
  activeNote: null,
  selectedNote: null,
  createFields: null,
  noteFields: null
};

export const NotesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withNotesMethods(),
  withPermissions('note')
);
