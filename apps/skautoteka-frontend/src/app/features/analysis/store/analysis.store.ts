import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { InputConfig, LoaderService } from "@skautoteka-frontend/ui";
import { forkJoin, pipe, switchMap, tap } from "rxjs";
import { AnalysisHttpService } from "../services/analysis-http.service";
import { tapResponse } from "@ngrx/operators";

export type AnalysisStoreState = {
  isLoading: boolean;
  reportFields: InputConfig | null;
  noteFields: InputConfig | null;
}

const initialState: AnalysisStoreState = {
  isLoading: false,
  reportFields: null,
  noteFields: null
}

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => {
    const http = inject(AnalysisHttpService);
    const loader = inject(LoaderService);

    const fetchFields = rxMethod<void>(pipe(
      tap(() => {
        loader.showLoader('fields');
        patchState(store, { isLoading: true })
      }),
      switchMap(() => {
        return forkJoin([
          http.getCreateFieldsNoteConfig$(),
          http.getCreateFieldsReportConfig$()
        ]).pipe(
          tapResponse({
            next: ([noteFields, reportFields]) => patchState(store, { reportFields, noteFields }),
            error: () => null,
            finalize: () => {
              patchState(store, { isLoading: false });
              loader.hideLoader('fields');
            }
          })
        )
      })
    ))

    return {
      fetchFields
    }
  })
)
