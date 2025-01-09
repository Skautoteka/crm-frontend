import { NoteFilter, ReportFilter } from './../interfaces/analysis';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LoaderService } from '@skautoteka-frontend/ui';
import { AnalysisHttpService } from '../services/analysis-http.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export type AnalysisStoreState = {
  isLoading: boolean;
  reportFilters: ReportFilter[] | null;
  noteFilters: NoteFilter[] | null;
};

const initialState: AnalysisStoreState = {
  isLoading: false,
  reportFilters: null,
  noteFilters: null
};

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => {
    const http = inject(AnalysisHttpService);
    const loader = inject(LoaderService);

    const getNoteFilters = rxMethod<void>(
      pipe(
        tap(() => loader.showLoader('filters')),
        switchMap(() =>
          http.getNoteFilters$().pipe(
            tapResponse({
              error: () => {
                patchState(store, { noteFilters: null });
                loader.hideLoader('filters');
              },
              next: ({ filters }) => {
                patchState(store, { noteFilters: filters });
                loader.hideLoader('filters');
              }
            })
          )
        )
      )
    );

    /**
     * Retrieves filters from backend
     */
    const getReportFilters = rxMethod<void>(
      pipe(
        tap(() => loader.showLoader('filters')),
        switchMap(() =>
          http.getReportFilters$().pipe(
            tapResponse({
              error: () => {
                patchState(store, { reportFilters: null });
                loader.hideLoader('filters');
              },
              next: ({ filters }) => {
                patchState(store, { reportFilters: filters });
                loader.hideLoader('filters');
              }
            })
          )
        )
      )
    );

    return {
      getReportFilters,
      getNoteFilters
    };
  })
);
