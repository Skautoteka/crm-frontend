import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Observable } from 'rxjs';
import { ReportFiltersPayload } from '../interfaces/analysis';

@Injectable({ providedIn: 'root' })
export class AnalysisHttpService {
  private _http = inject(HttpClient);

  /**
   * Retrieves all filters for report analysis
   */
  public getReportFilters$(): Observable<ReportFiltersPayload> {
    return this._http.get<ReportFiltersPayload>('/api/analysis/get-report-filters');
  }
}
