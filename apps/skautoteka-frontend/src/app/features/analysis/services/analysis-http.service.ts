import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalysisFiltersPaload } from '../interfaces/analysis';

@Injectable({ providedIn: 'root' })
export class AnalysisHttpService {
  private _http = inject(HttpClient);

  /**
   * Retrieves all filters for report analysis
   */
  public getReportFilters$(): Observable<AnalysisFiltersPaload> {
    return this._http.get<AnalysisFiltersPaload>('/api/analysis/get-report-filters');
  }

  /**
   * Retrieves all filters for note analysis
   *
   * @returns
   */
  public getNoteFilters$(): Observable<AnalysisFiltersPaload> {
    return this._http.get<AnalysisFiltersPaload>('/api/analysis/get-report-filters');
  }

  /**
   * Sends request for analysis for reports
   *
   * @returns
   */
  public sendReportAnalysis$(
    filters: Record<string, any>,
    playerId: string | null,
    regionId: string | null
  ): Observable<void> {
    return this._http.post<void>('/api/analysis/analyze-report', { filters, playerId, regionId });
  }
}
