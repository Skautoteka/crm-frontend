import { NoteFilter, PredicateFilterValue, ReportFilter } from './../interfaces/analysis';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { LoaderService } from '@skautoteka-frontend/ui';
import { AnalysisHttpService } from '../services/analysis-http.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
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
  noteFiltersGroup: null
};

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => {
    const http = inject(AnalysisHttpService);
    const loader = inject(LoaderService);
    const fb = inject(FormBuilder);

    /**
     * Sets step of the form
     *
     * @param step
     */
    const setStep = (step: number) => {
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
     * Sets report region id in state
     *
     * @param id
     * @returns
     */
    const setReportRegionId = (id: string | null): void => patchState(store, { reportRegionId: id });

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
                patchState(store, { reportFilters: null, reportFiltersGroup: null });
                loader.hideLoader('filters');
              },
              next: ({ filters }) => {
                const group = fb.group(
                  filters.reduce(
                    (acc, curr) => ({ ...acc, [curr.name]: new FormControl<PredicateFilterValue | null>(null) }),
                    {}
                  )
                );

                patchState(store, { reportFilters: filters, reportFiltersGroup: group });
                loader.hideLoader('filters');
              }
            })
          )
        )
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
              next: () => {
                loader.hideLoader('analysis-progress');
              },
              error: () => {
                loader.hideLoader('analysis-progress');
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
      setReportPlayerId,
      setReportRegionId,
      setStep,
      setType
    };
  })
);
