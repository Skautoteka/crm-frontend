import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalysisFiltersPaload, AnalysisLabels, AnalysisResultPayload } from '../interfaces/analysis';

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
    return this._http.get<AnalysisFiltersPaload>('/api/analysis/get-note-filters');
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
  ): Observable<AnalysisResultPayload> {
    return this._http.post<AnalysisResultPayload>('/api/analysis/analyze-report', { filters, playerId, regionId });
  }

  /**
   * Sends HTTP request in order to retrieve note analysis
   *
   * @param filters
   * @param teamId
   * @returns
   */
  public sendNoteAnalysis$(filters: Record<string, any>, teamId: string | null): Observable<AnalysisResultPayload> {
    return this._http.post<AnalysisResultPayload>('/api/analysis/analyze-note', { filters, teamId });
  }

  /**
   * Retrieves labels map for all assessments.
   *
   * @returns
   */
  public getLabels$(): Observable<AnalysisLabels> {
    return this._http.get<AnalysisLabels>('/api/analysis/get-labels');
  }
}
