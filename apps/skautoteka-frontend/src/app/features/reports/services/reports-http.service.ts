import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Report } from '../interfaces/report';
import { Team } from '../../teams/interfaces/team';
import { IModelResponse } from '@skautoteka-frontend/common';

@Injectable({ providedIn: 'root' })
export class ReportsHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets create fields for report model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/report/create-fields');
  }

  /**
   * Retrieves all reports from the database.
   *
   * @returns
   */
  public getAllReports$(): Observable<Report[]> {
    return this.http.get<Report[]>('api/report/all');
  }

  /**
   * Removes task from database.
   *
   * @param id
   * @returns
   */
  public removeReport$(id: string): Observable<void> {
    return this.http.delete<void>('api/report/' + id);
  }

  /**
   * Post http request that adds a new report.
   *
   * @param report
   */
  public addReport$(report: Report): Observable<IModelResponse<Report>> {
    return this.http.post<IModelResponse<Report>>('api/report', { ...report });
  }
}
