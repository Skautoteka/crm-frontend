import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { Router } from '@angular/router';
import { ModalService, NotificationsService } from '@skautoteka-frontend/ui';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { TasksStoreState } from './tasks.store';
import { TasksHttpService } from '../services/tasks-http.service';
import { Task } from '../interfaces/task';

export const withTasksMethods = () => {
  return signalStoreFeature(
    { state: type<TasksStoreState>() },
    withMethods(store => {
      const httpService = inject(TasksHttpService);
      const router = inject(Router);
      const modal = inject(ModalService);
      const notification = inject(NotificationsService);

      /**
       * Gets all tasks from the database.
       */
      const getTasks = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            httpService.getAllTasks$().pipe(
              tapResponse({
                next: tasks => {
                  patchState(store, { tasks });
                },
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
       * Gets all reports based on task id from the database.
       * @param id
       */
      const getAssignedReports = rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(id =>
            httpService.getAssignedReports$(id).pipe(
              tapResponse({
                next: reports => patchState(store, { assignedReports: reports }),
                error: () => null,
                finalize: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      );

      /**
       * Gets all notes based on task id from the database.
       * @param id
       */
      const getAssignedNotes = rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(id =>
            httpService.getAssignedNotes$(id).pipe(
              tapResponse({
                next: notes => patchState(store, { assignedNotes: notes }),
                error: () => null,
                finalize: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      );

      /**
       * Private method to filter tasks.
       *
       * @param id
       * @returns
       */
      const _filterTask = (id: string | null): Task[] => store.tasks().filter(task => task.id !== id);

      /**
       * A private method that is used to find a task from the store.
       *
       * @param id
       * @returns
       */
      const _findTask = (id: string | null): Task | null => store.tasks().find(task => task.id === id) || null;

      /**
       * Removes task from the database and from the store.
       */
      const removeTask = rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(id =>
            httpService.removeTask$(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { tasks: _filterTask(id) });
                  notification.success('Poprawnie usunieto zadanie');
                },
                error: () => {
                  notification.error('Brak dostepu do usuwania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => setActiveTask(null)
              })
            )
          )
        )
      );

      /**
       * Adds a task to the store and to the database.
       */
      const addTask = rxMethod<Task>(
        pipe(
          switchMap(task =>
            httpService.addTask$(task).pipe(
              tapResponse({
                next: ({ added }) => {
                  patchState(store, { tasks: [...store.tasks(), added] });
                  notification.success('Poprawnie dodano zadanie');
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
       * Sets active task.
       *
       * @param id
       */
      const setActiveTask = (id: string | null) => {
        const activeTask = _findTask(id);

        if (activeTask) {
          router.navigate(['dashboard', 'tasks', 'details', activeTask.id]);
        } else {
          router.navigate(['dashboard', 'tasks']);
        }

        patchState(store, { activeTask });
      };

      /**
       * Assigns a user id to task
       *
       * @returns
       */
      const assignReport$ = (taskId: string, reportId: string): Observable<void> => {
        return httpService.assignReport$(taskId, reportId).pipe(
          tap(() => {
            getAssignedNotes(taskId);
            getAssignedReports(taskId);
          })
        );
      };

      return {
        getTasks,
        getAssignedReports,
        getAssignedNotes,
        removeTask,
        addTask,
        fetchFields,
        setActiveTask,
        assignReport$
      };
    })
  );
};
