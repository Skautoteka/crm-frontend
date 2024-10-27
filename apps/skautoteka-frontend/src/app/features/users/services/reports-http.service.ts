import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { User } from '../interfaces/user';
import { IModelResponse } from '@skautoteka-frontend/common';

@Injectable({ providedIn: 'root' })
export class ReportsHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets create fields for report model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('http://localhost:3000/api/report/create-fields', { withCredentials: true });
  }

  /**
   * Retrieves all reports from the database.
   *
   * @returns
   */
  public getAllReports$(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/report/all', { withCredentials: true });
  }

  /**
   * Removes task from database.
   *
   * @param id
   * @returns
   */
  public removeReport$(id: string): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/api/report/' + id, { withCredentials: true });
  }

  /**
   * Post http request that adds a new report.
   *
   * @param report
   */
  public addReport$(user: User): Observable<IModelResponse<User>> {
    return this.http.post<IModelResponse<User>>(
      'http://localhost:3000/api/report',
      { ...user },
      { withCredentials: true }
    );
  }
}
