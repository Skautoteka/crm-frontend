import { inject } from '@angular/core';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { InputConfig, LoaderService } from '@skautoteka-frontend/ui';
import { AnalysisHttpService } from '../services/analysis-http.service';

export type AnalysisStoreState = {
  isLoading: boolean;
  reportFields: InputConfig | null;
  noteFields: InputConfig | null;
};

const initialState: AnalysisStoreState = {
  isLoading: false,
  reportFields: null,
  noteFields: null
};

export const AnalysisStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => {
    const http = inject(AnalysisHttpService);
    const loader = inject(LoaderService);

    return {};
  })
);
