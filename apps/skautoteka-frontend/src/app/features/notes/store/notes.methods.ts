import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { NotesStoreState } from './notes.store';
import { inject } from '@angular/core';
import { NotesHttpService } from '../services/notes-http.service';
import { Router } from '@angular/router';
import { ModalService, NotificationsService } from '@skautoteka-frontend/ui';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Note } from '../interfaces/note';

export const withNotesMethods = () => {
  return signalStoreFeature(
    { state: type<NotesStoreState>() },
    withMethods(store => {
      const httpService = inject(NotesHttpService);
      const router = inject(Router);
      const modal = inject(ModalService);
      const notification = inject(NotificationsService);

      /**
       * Gets all notes from the database.
       */
      const getNotes = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            httpService.getAllNotes$().pipe(
              tapResponse({
                next: notes => patchState(store, { notes }),
                error: () => {
                  notification.error('Brak dostepu do rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      );

      /**
       * Private method to filter notes.
       *
       * @param id
       * @returns
       */
      const _filterNote = (id: string | null): Note[] => store.notes().filter(note => note.id !== id);

      /**
       * A private method that is used to find a note from the store.
       *
       * @param id
       * @returns
       */
      const _findNote = (id: string | null): Note | null => store.notes().find(note => note.id === id) || null;

      /**
       * Removes note from the database and from the store.
       */
      const removeNote = rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(id =>
            httpService.removeNote$(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { notes: _filterNote(id) });
                  notification.success('Poprawnie usunieto raport');
                },
                error: () => {
                  notification.error('Brak dostepu do usuwania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => setActiveNote(null)
              })
            )
          )
        )
      );

      /**
       * Adds a note to the store and to the database.
       */
      const addNote = rxMethod<Note>(
        pipe(
          switchMap(note =>
            httpService.addNote$(note).pipe(
              tapResponse({
                next: ({ added }) => {
                  patchState(store, { notes: [...store.notes(), added] });
                  notification.success('Poprawnie dodano notatke');
                },
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => modal.closeAll()
              })
            )
          )
        )
      );

      /**
       * Updates a note to the store and to the database.
       */
      const updateNote = rxMethod<Note>(
        pipe(
          switchMap(note =>
            httpService.updateNote$(note).pipe(
              tapResponse({
                next: ({ updated }) => {
                  patchState(store, {
                    notes: store.notes().map(r => (r.id === updated.id ? updated : r))
                  });
                  notification.success('Poprawnie zaktualizowano notatke');
                },
                error: () => {
                  notification.error('Brak dostepu do aktualizacji rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => modal.closeAll()
              })
            )
          )
        )
      );

      /**
       * Fetches the create fields from backend and saves it to the store.
       */
      const fetchFields = rxMethod<void>(
        pipe(
          switchMap(() =>
            httpService.getCreateFieldsConfig$().pipe(
              tapResponse({
                next: createFields => patchState(store, { createFields }),
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                }
              })
            )
          )
        )
      );

      /**
       * Fetches the create fields from backend and saves it to the store.
       */
      const fetchNoteFields = rxMethod<string>(
        pipe(
          switchMap(id =>
            httpService.getNotesFieldsConfig$(id).pipe(
              tapResponse({
                next: noteFields => patchState(store, { noteFields }),
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                }
              })
            )
          )
        )
      );

      const cleanNoteFields = () => {
        patchState(store, { noteFields: null });
      };

      /**
       * Sets active note.
       *
       * @param id
       */
      const setActiveNote = (id: string | null) => {
        const activeNote = _findNote(id);

        if (activeNote) {
          router.navigate(['dashboard', 'notes', 'details', activeNote.id]);
        } else {
          router.navigate(['dashboard', 'notes']);
        }

        patchState(store, { activeNote });
      };

      /**
       * Sets active note.
       *
       * @param id
       */
      const setSelectedNote = (note: Note | null) => {
        patchState(store, { selectedNote: note });
      };

      return {
        getNotes,
        removeNote,
        addNote,
        updateNote,
        fetchFields,
        fetchNoteFields,
        setActiveNote,
        setSelectedNote,
        cleanNoteFields
      };
    })
  );
};
