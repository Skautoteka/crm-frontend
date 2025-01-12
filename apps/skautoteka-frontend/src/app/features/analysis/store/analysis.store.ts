import {
  AnalysisResult,
  FilterPredicate,
  NoteFilter,
  PredicateFilterValue,
  ReportFilter
} from './../interfaces/analysis';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LoaderService, NotificationsService } from '@skautoteka-frontend/ui';
import { AnalysisHttpService } from '../services/analysis-http.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { NEVER, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export type AnalysisStoreState = {
  isLoading: boolean;
  step: number;
  type: 'note' | 'report' | null;

  /**
   * Report analysis state
   */
  reportFilters: ReportFilter[] | null;
  reportFiltersGroup: FormGroup | null;
  reportPlayerId: string | null;
  reportRegionId: string | null;

  /**
   * Note analysis state
   */
  noteFilters: NoteFilter[] | null;
  noteFiltersGroup: FormGroup | null;
  noteTeamId: string | null;

  /**
   * Analysis results
   */
  analysisResult: AnalysisResult[] | null;
  analysisResultType: 'note' | 'report' | null;
};

const initialState: AnalysisStoreState = {
  step: 0,
  type: null,

  isLoading: false,
  reportFilters: null,
  reportFiltersGroup: null,
  reportPlayerId: null,
  reportRegionId: null,
  noteFilters: null,
  noteFiltersGroup: null,
  noteTeamId: null,

  analysisResult: null,
  analysisResultType: null
};

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => {
    const http = inject(AnalysisHttpService);
    const loader = inject(LoaderService);
    const fb = inject(FormBuilder);
    const notification = inject(NotificationsService);

    /**
     * Sets step of the form
     *
     * @param step
     */
    const setStep = (step: number) => {
      if (step === 0) {
        patchState(store, { type: null });
      }

      patchState(store, { step });
    };

    /**
     * Sets type of the form
     *
     * @param type
     */
    const setType = (type: 'note' | 'report') => {
      patchState(store, { type });
    };

    /**
     * Sets report player id in state
     *
     * @param id
     * @returns
     */
    const setReportPlayerId = (id: string | null): void => patchState(store, { reportPlayerId: id });

    /**
     * Sets note team id
     *
     * @param id
     * @returns
     */
    const setNoteTeamId = (id: string | null): void => patchState(store, { noteTeamId: id });

    /**
     * Sets report region id in state
     *
     * @param id
     * @returns
     */
    const setReportRegionId = (id: string | null): void => patchState(store, { reportRegionId: id });

    /**
     * Clears analysis
     *
     * @returns
     */
    const clearAnalysis = () => patchState(store, initialState);

    /**
     * Retrieves note filters
     */
    const getNoteFilters = rxMethod<void>(
      pipe(
        switchMap(() => {
          if (store.noteFilters()) {
            return NEVER;
          }

          loader.showLoader('filters');
          return http.getNoteFilters$().pipe(
            tapResponse({
              error: () => {
                patchState(store, { noteFilters: null });
                loader.hideLoader('filters');
              },
              next: ({ filters }) => {
                const group = fb.group(
                  filters.reduce(
                    (acc, curr) => ({
                      ...acc,
                      [curr.name]: new FormControl<PredicateFilterValue | null>({
                        value: null,
                        predicate: FilterPredicate.eq
                      })
                    }),
                    {}
                  )
                );

                patchState(store, { noteFilters: filters, noteFiltersGroup: group });
                loader.hideLoader('filters');
              }
            })
          );
        })
      )
    );

    /**
     * Retrieves filters from backend
     */
    const getReportFilters = rxMethod<void>(
      pipe(
        switchMap(() => {
          if (store.reportFilters()) {
            return NEVER;
          }

          loader.showLoader('filters');
          return http.getReportFilters$().pipe(
            tapResponse({
              error: () => {
                patchState(store, { reportFilters: null, reportFiltersGroup: null });
                loader.hideLoader('filters');
              },
              next: ({ filters }) => {
                const group = fb.group(
                  filters.reduce(
                    (acc, curr) => ({
                      ...acc,
                      [curr.name]: new FormControl<PredicateFilterValue | null>({
                        value: null,
                        predicate: FilterPredicate.eq
                      })
                    }),
                    {}
                  )
                );

                patchState(store, { reportFilters: filters, reportFiltersGroup: group });
                loader.hideLoader('filters');
              }
            })
          );
        })
      )
    );

    /**
     * Sends note analysis to the crm-backend service
     */
    const sendNoteAnalysis = rxMethod<void>(
      pipe(
        tap(() => loader.showLoader('analysis-progress')),
        switchMap(() => {
          const group = store.noteFiltersGroup();

          if (!group) {
            throw new Error('There is no form group');
          }

          return http.sendNoteAnalysis$(group.value, store.noteTeamId()).pipe(
            tapResponse({
              next: ({ entries, type }) => {
                loader.hideLoader('analysis-progress');
                notification.success('Sukces', 'Udało się poprawnie utworzyć analizę');
                patchState(store, { analysisResult: entries, analysisResultType: type });
              },
              error: () => {
                patchState(store, initialState);
                loader.hideLoader('analysis-progress');
                notification.error('Wystąpił problem', 'Nie udało się utworzyć analizy');
              }
            })
          );
        })
      )
    );

    /**
     * Sends report analysis
     */
    const sendReportAnalysis = rxMethod<void>(
      pipe(
        tap(() => loader.showLoader('analysis-progress')),
        switchMap(() => {
          const group = store.reportFiltersGroup();

          if (!group) {
            throw new Error('There is no form group');
          }

          return http.sendReportAnalysis$(group.value, store.reportPlayerId(), store.reportRegionId()).pipe(
            tapResponse({
              next: ({ entries, type }) => {
                loader.hideLoader('analysis-progress');
                notification.success('Sukces', 'Udało się poprawnie utworzyć analizę');
                patchState(store, { analysisResult: entries, analysisResultType: type });
              },
              error: () => {
                patchState(store, initialState);
                loader.hideLoader('analysis-progress');
                notification.error('Wystąpił problem', 'Nie udało się utworzyć analizy');
              }
            })
          );
        })
      )
    );

    return {
      getReportFilters,
      getNoteFilters,
      sendReportAnalysis,
      sendNoteAnalysis,
      setReportPlayerId,
      setReportRegionId,
      setStep,
      setType,
      setNoteTeamId,
      clearAnalysis
    };
  })
);
